import React from 'react';
import { fetchLocalization } from '@/api/notice';
import { Skeleton, Typography } from '@mui/material';
import { PostProps, PostState } from '@/types/Notice/Post.type';
import { ErrorContext } from '@/contexts/ErrorContext';

class Post extends React.Component<PostProps, PostState> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  constructor(props: PostProps) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadLocalization();
  }

  componentDidUpdate(prevProps: PostProps) {
    if (
      prevProps.post.titleLocalizationUuid !==
      this.props.post.titleLocalizationUuid
    ) {
      this.loadLocalization();
    }
  }

  loadLocalization = () => {
    const { titleLocalizationUuid } = this.props.post;

    if (!titleLocalizationUuid) {
      this.setState({ loading: false, localization: null });
      return;
    }

    this.setState({ loading: true });

    fetchLocalization(titleLocalizationUuid)
      .then((data) => {
        this.setState({ localization: data });
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.context?.showError(error.message);
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { localization, loading } = this.state;

    if (loading) {
      return (
        <Skeleton
          variant='rounded'
          width={300}
          height={30}
          animation='wave'
        />
      );
    }

    return (
      <Typography
        variant='body2'
        sx={{ fontSize: '1.333rem', color: 'var(--darkGray)' }}>
        {localization?.default ?? ''}
      </Typography>
    );
  }
}

export default Post;

import React from 'react';

import { Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import { ErrorContext } from '@/contexts/ErrorContext';
import { PostProps, PostState } from '@/types/Notice/Post.type';

import PostSkeleton from './PostSkeleton';

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
      return <PostSkeleton />;
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

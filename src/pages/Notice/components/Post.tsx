import React from 'react';

import { Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import { ErrorContext } from '@/contexts/ErrorContext';
import { validateLanguageContext } from '@/contexts/LanguageContext';
import { LanguageContext } from '@/contexts/LanguageProvider';
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

  shouldComponentUpdate(nextProps: PostProps, nextState: PostState): boolean {
    const currentPost = this.props.post;
    const nextPost = nextProps.post;

    if (currentPost.titleLocalizationUuid !== nextPost.titleLocalizationUuid) {
      return true;
    }

    if (this.state.loading !== nextState.loading) {
      return true;
    }
    if (this.state.localization !== nextState.localization) {
      return true;
    }

    return false;
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
      <LanguageContext.Consumer>
        {(languageContext) => {
          const validatedContext = validateLanguageContext(languageContext);

          return (
            <Typography
              variant='body2'
              sx={{ fontSize: '1.333rem', color: 'var(--darkGray)' }}>
              {validatedContext.getLocalizedContent(localization)}
            </Typography>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}

export default Post;

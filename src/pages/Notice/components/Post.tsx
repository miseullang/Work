import React from 'react';

import { Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import { ErrorContext } from '@/contexts/ErrorContext';
import { withLanguage } from '@/contexts/LanguageContext';
import { LanguageContextType } from '@/types/LanguageContext/LanguageContext.type';
import { PostProps, PostState } from '@/types/Notice/Post.type';

import PostSkeleton from './PostSkeleton';

class Post extends React.Component<PostProps & LanguageContextType, PostState> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  constructor(props: PostProps & LanguageContextType) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
  }

  shouldComponentUpdate(
    nextProps: PostProps & LanguageContextType,
    nextState: PostState,
  ): boolean {
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

    if (this.props.currentLanguage !== nextProps.currentLanguage) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    this.loadLocalization();
  }

  componentDidUpdate(prevProps: PostProps & LanguageContextType) {
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
    const { getLocalizedContent } = this.props;

    if (loading) {
      return <PostSkeleton />;
    }

    return (
      <Typography
        variant='body2'
        sx={{ fontSize: '1.333rem', color: 'var(--darkGray)' }}>
        {getLocalizedContent(localization)}
      </Typography>
    );
  }
}

export default withLanguage(Post);

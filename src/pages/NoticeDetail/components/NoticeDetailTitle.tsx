import React from 'react';

import { Box, Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import { withLanguage } from '@/contexts/LanguageContext';
import { LanguageContextType } from '@/types/LanguageContext/LanguageContext.type';
import { NoticeTitleProps } from '@/types/NoticeDetail/NoticeDetailTitle.type';
import { NoticeDetailTitleState } from '@/types/NoticeDetail/NoticeDetailTitle.type';

import NoticeDetailTitleSkeleton from './NoticeDetailTitleSkeleton';

class NoticeDetailTitle extends React.Component<
  NoticeTitleProps & LanguageContextType,
  NoticeDetailTitleState
> {
  constructor(props: NoticeTitleProps & LanguageContextType) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
  }

  shouldComponentUpdate(
    nextProps: NoticeTitleProps & LanguageContextType,
    nextState: NoticeDetailTitleState,
  ): boolean {
    if (this.props.uuid !== nextProps.uuid) {
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
    this.fetchLocalizationData();
  }

  componentDidUpdate(prevProps: NoticeTitleProps & LanguageContextType) {
    if (prevProps.uuid !== this.props.uuid) {
      this.fetchLocalizationData();
    }
  }

  fetchLocalizationData = async () => {
    const { uuid } = this.props;
    this.setState({ loading: true });

    try {
      const data = await fetchLocalization(uuid);
      this.setState({ localization: data });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, localization } = this.state;
    const { getLocalizedContent } = this.props;

    if (loading) {
      return <NoticeDetailTitleSkeleton />;
    }

    if (!localization) return null;

    return (
      <Box
        pb={2}
        borderBottom='1px solid var(--lightGray)'>
        <Typography
          variant='h1'
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--darkGray)',
          }}>
          {getLocalizedContent(localization)}
        </Typography>
      </Box>
    );
  }
}

export default withLanguage(NoticeDetailTitle);

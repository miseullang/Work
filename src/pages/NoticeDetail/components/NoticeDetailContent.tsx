import React from 'react';

import { Box, Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import RichTextViewer from '@/components/RichTextViewer';
import { withLanguage } from '@/contexts/LanguageContext';
import { LanguageContextType } from '@/types/LanguageContext/LanguageContext.type';
import { NoticeContentProps } from '@/types/NoticeDetail/NoticeDetailContent.type';
import { NoticeDetailContentState } from '@/types/NoticeDetail/NoticeDetailContent.type';

import NoticeDetailContentSkeleton from './NoticeDetailContentSkeleton';

class NoticeDetailContent extends React.Component<
  NoticeContentProps & LanguageContextType,
  NoticeDetailContentState
> {
  constructor(props: NoticeContentProps & LanguageContextType) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
  }

  shouldComponentUpdate(
    nextProps: NoticeContentProps & LanguageContextType,
    nextState: NoticeDetailContentState,
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

  componentDidUpdate(prevProps: NoticeContentProps & LanguageContextType) {
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
      return <NoticeDetailContentSkeleton />;
    }

    if (!localization) {
      return <Typography>데이터를 불러올 수 없습니다.</Typography>;
    }

    return (
      <Box pt={2}>
        <RichTextViewer content={getLocalizedContent(localization)} />
      </Box>
    );
  }
}

export default withLanguage(NoticeDetailContent);

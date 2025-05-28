import React from 'react';

import { Box, Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import RichTextViewer from '@/components/RichTextViewer';
import { validateLanguageContext } from '@/contexts/LanguageContext';
import { LanguageContext } from '@/contexts/LanguageProvider';
import { NoticeContentProps } from '@/types/NoticeDetail/NoticeDetailContent.type';
import { NoticeDetailContentState } from '@/types/NoticeDetail/NoticeDetailContent.type';

import NoticeDetailContentSkeleton from './NoticeDetailContentSkeleton';

class NoticeDetailContent extends React.Component<
  NoticeContentProps,
  NoticeDetailContentState
> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  constructor(props: NoticeContentProps) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
  }

  shouldComponentUpdate(
    nextProps: NoticeContentProps,
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

    return false;
  }

  componentDidMount() {
    this.fetchLocalizationData();
  }

  componentDidUpdate(prevProps: NoticeContentProps) {
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
    const { getLocalizedContent } = validateLanguageContext(this.context);

    if (loading) {
      return <NoticeDetailContentSkeleton />;
    }

    if (!localization) {
      return <Typography>데이터를 불러올 수 없습니다.</Typography>;
    }

    return (
      <Box
        pt={'80px'}
        sx={{
          textAlign: 'center',
          '& img': { display: 'block', margin: '0 auto' },
        }}>
        <RichTextViewer content={getLocalizedContent(localization)} />
      </Box>
    );
  }
}

export default NoticeDetailContent;

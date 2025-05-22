import React from 'react';
import { fetchLocalization } from '@/api/notice';
import { Box, Typography } from '@mui/material';
import { NoticeContentProps } from '@/types/NoticeDetail/NoticeDetailContent.type';
import NoticeDetailContentSkeleton from './NoticeDetailContentSkeleton';
import RichTextViewer from '@/components/RichTextViewer';
import { NoticeDetailContentState } from '@/types/NoticeDetail/NoticeDetailContent.type';

class NoticeDetailContent extends React.Component<
  NoticeContentProps,
  NoticeDetailContentState
> {
  constructor(props: NoticeContentProps) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
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

    if (loading) {
      return <NoticeDetailContentSkeleton />;
    }

    if (!localization) {
      return <Typography>데이터를 불러올 수 없습니다.</Typography>;
    }

    return (
      <Box pt={2}>
        <RichTextViewer content={localization.default} />
      </Box>
    );
  }
}

export default NoticeDetailContent;

import React from 'react';

import { Box, Typography } from '@mui/material';

import { fetchLocalization } from '@/api/notice';
import { NoticeTitleProps } from '@/types/NoticeDetail/NoticeDetailTitle.type';
import { NoticeDetailTitleState } from '@/types/NoticeDetail/NoticeDetailTitle.type';

import NoticeDetailTitleSkeleton from './NoticeDetailTitleSkeleton';

class NoticeDetailTitle extends React.Component<
  NoticeTitleProps,
  NoticeDetailTitleState
> {
  constructor(props: NoticeTitleProps) {
    super(props);
    this.state = {
      localization: null,
      loading: true,
    };
  }

  shouldComponentUpdate(
    nextProps: NoticeTitleProps,
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

    return false;
  }

  componentDidMount() {
    this.fetchLocalizationData();
  }

  componentDidUpdate(prevProps: NoticeTitleProps) {
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
          {localization.default}
        </Typography>
      </Box>
    );
  }
}

export default NoticeDetailTitle;

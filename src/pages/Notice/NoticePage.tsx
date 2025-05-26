import React from 'react';
import { Suspense } from 'react';

import { Box } from '@mui/material';

import NoticeHeader from './components/NoticeHeader';
import NoticeList from './components/NoticeList';
import NoticePageSkeleton from './components/NoticePageSkeleton';

class NoticePage extends React.Component {
  render() {
    return (
      <Suspense fallback={<NoticePageSkeleton />}>
        <Box>
          <NoticeHeader />
          <NoticeList />
        </Box>
      </Suspense>
    );
  }
}

export default NoticePage;

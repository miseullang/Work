import React from 'react';

import { Box, Skeleton } from '@mui/material';

import NoticeItemSkeleton from './NoticeItemSkeleton';

class NoticePageSkeleton extends React.Component {
  render() {
    return (
      <Box>
        <Box sx={{ mb: 4 }}>
          <Skeleton
            variant='rounded'
            width={120}
            height={56}
            sx={{ mb: 1 }}
          />
        </Box>

        {Array.from({ length: 10 }).map((_, index) => (
          <NoticeItemSkeleton key={index} />
        ))}
      </Box>
    );
  }
}

export default NoticePageSkeleton;

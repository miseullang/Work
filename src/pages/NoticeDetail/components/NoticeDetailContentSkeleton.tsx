import React from 'react';

import { Box, Skeleton } from '@mui/material';

class NoticeDetailContentSkeleton extends React.Component {
  render() {
    return (
      <Box
        pt={2}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton
          variant='text'
          width='60%'
          height='28px'
          animation='wave'
        />
        <Skeleton
          variant='rounded'
          width='60%'
          height='200px'
          animation='wave'
        />
        <Skeleton
          variant='text'
          width='70%'
          height='28px'
          animation='wave'
        />
        <Skeleton
          variant='text'
          width='80%'
          height='28px'
          animation='wave'
        />
        <Skeleton
          variant='text'
          width='80%'
          height='28px'
          animation='wave'
        />
        <Skeleton
          variant='text'
          width='80%'
          height='28px'
          animation='wave'
        />
      </Box>
    );
  }
}

export default NoticeDetailContentSkeleton;

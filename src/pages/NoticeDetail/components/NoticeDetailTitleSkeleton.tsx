import React from 'react';

import { Box, Skeleton } from '@mui/material'

class NoticeDetailTitleSkeleton extends React.Component {
  render() {
    return (
      <Box pb={2} borderBottom='1px solid var(--lightGray)'>
        <Skeleton variant='text' width='40%' height='50px' animation='wave' />
      </Box>
    );
  }
}

export default NoticeDetailTitleSkeleton
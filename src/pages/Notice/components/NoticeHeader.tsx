import React from 'react';
import { Box, Typography } from '@mui/material';

class NoticeHeader extends React.Component {
  render() {
    return (
      <Box pb={5}>
        <Typography
          variant='h3'
          fontWeight={700}>
          공지사항
        </Typography>
      </Box>
    );
  }
}

export default NoticeHeader;

import { Box, Skeleton } from '@mui/material';

const NoticeDetailContentSkeleton = () => {
  return (
    <Box pt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton
        variant='text'
        width='60%'
        height='28px'
        animation='wave'
      />
      <Skeleton
        variant='rectangular'
        width='60%'
        height='200px'
        animation='wave'
      />
      <Skeleton
        variant='text'
        width='60%'
        height='28px'
        animation='wave'
      />
      <Skeleton
        variant='text'
        width='60%'
        height='28px'
        animation='wave'
      />
      <Skeleton
        variant='text'
        width='60%'
        height='28px'
        animation='wave'
      />
    </Box>
  );
};

export default NoticeDetailContentSkeleton;

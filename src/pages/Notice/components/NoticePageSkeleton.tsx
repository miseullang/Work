import { Box, Skeleton } from '@mui/material';
import NoticeSkeletonItem from './NoticeSkeletonItem';

const NoticePageSkeleton = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Skeleton
          variant='rectangular'
          width={120}
          height={32}
          sx={{ mb: 1 }}
        />
        <Skeleton
          variant='text'
          width='60%'
          height={24}
        />
      </Box>

      {Array.from({ length: 10 }).map((_, index) => (
        <NoticeSkeletonItem key={index} />
      ))}
    </Box>
  );
};

export default NoticePageSkeleton;

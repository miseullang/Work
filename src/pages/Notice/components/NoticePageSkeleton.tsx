import { Box, Skeleton } from '@mui/material';
import NoticeSkeletonItem from './NoticeSkeletonItem';

const NoticePageSkeleton = () => {
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
        <NoticeSkeletonItem key={index} />
      ))}
    </Box>
  );
};

export default NoticePageSkeleton;

import { Skeleton } from '@mui/material';

const PostSkeleton = () => {
  return (
    <Skeleton
      variant='rounded'
      width={300}
      height={30}
      animation='wave'
    />
  );
};

export default PostSkeleton;

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { StyledSkeleton } from './Notice.style';

class NoticeSkeletonItem extends React.Component {
  render() {
    return (
      <StyledSkeleton>
        <Skeleton
          variant='rounded'
          width={100}
          height={30}
          animation='wave'
        />
        <Skeleton
          variant='rounded'
          width={300}
          height={30}
          animation='wave'
        />
      </StyledSkeleton>
    );
  }
}

export default NoticeSkeletonItem;

import React from 'react';

import DatetimeSkeleton from './DatetimeSkeleton';
import { StyledSkeleton } from './Notice.style';
import PostSkeleton from './PostSkeleton';

class NoticeItemSkeleton extends React.Component {
  render() {
    return (
      <StyledSkeleton>
        <DatetimeSkeleton />
        <PostSkeleton />
      </StyledSkeleton>
    );
  }
}

export default NoticeItemSkeleton;

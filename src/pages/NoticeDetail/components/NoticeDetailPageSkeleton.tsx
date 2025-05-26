import React from 'react';

import NoticeDetailContentSkeleton from './NoticeDetailContentSkeleton';
import NoticeDetailTitleSkeleton from './NoticeDetailTitleSkeleton';

class NoticeDetailPageSkeleton extends React.Component {
  render() {
    return (
      <div>
        <NoticeDetailTitleSkeleton />
        <NoticeDetailContentSkeleton />
      </div>
    );
  }
}

export default NoticeDetailPageSkeleton;

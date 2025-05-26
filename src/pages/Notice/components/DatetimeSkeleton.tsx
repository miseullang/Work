import React from 'react';

import { Skeleton } from '@mui/material';

class DatetimeSkeleton extends React.Component {
  render() {
    return (
      <Skeleton
        variant='rounded'
        width={100}
        height={30}
        animation='wave'
      />
    );
  }
}

export default DatetimeSkeleton;

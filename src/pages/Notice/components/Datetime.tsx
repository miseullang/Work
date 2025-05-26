import React from 'react';

import { Typography } from '@mui/material';

import { DatetimeProps } from '@/types/Notice/DateTime.type';
import { formatDate } from '@/utils/dateformat';

class Datetime extends React.Component<DatetimeProps> {
  render() {
    const { datetime } = this.props;
    
    return (
      <Typography
        variant='body2'
        sx={{
        fontSize: '1.333rem',
        color: 'var(--darkGray)',
      }}>
        {formatDate(datetime)}
      </Typography>
    );
  }
}

export default Datetime;

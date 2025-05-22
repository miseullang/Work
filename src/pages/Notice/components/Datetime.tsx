import React from 'react';
import { Typography } from '@mui/material';
import { formatDate } from '@/utils/dateformat';
import { DatetimeProps } from '@/types/Notice/DateTime.type';

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

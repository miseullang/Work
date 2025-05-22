import { Typography } from '@mui/material';
import { formatDate } from '@/utils/dateformat';
import { DatetimeProps } from '@/types/Notice/DateTime.type';

const Datetime = ({ datetime }: DatetimeProps) => {
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
};

export default Datetime;

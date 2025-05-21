import { Typography } from '@mui/material';
import { formatDate } from '@/utils/dateformat';
interface DatetimeProps {
  datetime: string;
}

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

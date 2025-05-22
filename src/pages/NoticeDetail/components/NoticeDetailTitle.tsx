import { useState, useEffect } from 'react';
import { fetchLocalization } from '@/api/notice';
import { ILocalization } from '@carebell/bell-core';
import { Box, Typography } from '@mui/material';
import { NoticeTitleProps } from '@/types/NoticeDetail/NoticeTitle.type';
import NoticeDetailTitleSkeleton from './NoticeDetailTitleSkeleton';

const NoticeDetailTitle = ({ uuid }: NoticeTitleProps) => {
  const [localization, setLocalization] = useState<ILocalization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLocalization(uuid)
      .then(setLocalization)
      .finally(() => setLoading(false));
  }, [uuid]);

  if (loading) {
    return <NoticeDetailTitleSkeleton />;
  }

  if (!localization) return null;

  return (
    <Box
      pb={2}
      borderBottom='1px solid var(--lightGray)'>
      <Typography
        variant='h1'
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'var(--darkGray)',
        }}>
        {localization.default}
      </Typography>
    </Box>
  );
};

export default NoticeDetailTitle;

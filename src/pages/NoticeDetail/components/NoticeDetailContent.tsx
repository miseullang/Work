import { useState, useEffect } from 'react';
import { fetchLocalization } from '@/api/notice';
import { ILocalization } from '@carebell/bell-core';
import { Box, Typography } from '@mui/material';
import { NoticeContentProps } from '@/types/NoticeDetail/NoticeContent.type';
import NoticeDetailContentSkeleton from './NoticeDetailContentSkeleton';

const NoticeDetailContent = ({ uuid }: NoticeContentProps) => {
  const [localization, setLocalization] = useState<ILocalization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLocalization(uuid)
      .then(setLocalization)
      .finally(() => setLoading(false));
  }, [uuid]);

  if (loading) {
    return <NoticeDetailContentSkeleton />;
  }

  if (!localization) return <Typography>데이터를 불러올 수 없습니다.</Typography>;

  return (
    <Box pt={2}>
      <Typography
        variant='body1'
        sx={{ color: 'var(--darkGray)' }}>
        {localization.default}
      </Typography>
    </Box>
  );
};

export default NoticeDetailContent;

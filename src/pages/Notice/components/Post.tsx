import { useEffect, useState } from 'react';
import { fetchLocalization } from '@/api/notice';
import { IPost, ILocalization } from '@carebell/bell-core';
import { Skeleton, Typography } from '@mui/material';

interface PostProps {
  post: IPost;
}

const Post = ({ post }: PostProps) => {
  const [localization, setLocalization] = useState<ILocalization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!post.titleLocalizationUuid) {
      setLoading(false);
      return;
    }

    fetchLocalization(post.titleLocalizationUuid)
      .then(setLocalization)
      .finally(() => setLoading(false));
  }, [post.titleLocalizationUuid]);

  if (loading) {
    return (
      <Skeleton
        variant='rounded'
        width={300}
        height={30}
        animation='wave'
      />
    );
  }

  return (
    <Typography
      variant='body2'
      sx={{ fontSize: '1.333rem', color: 'var(--darkGray)' }}>
      {localization?.default ?? ''}
    </Typography>
  );
};

export default Post;

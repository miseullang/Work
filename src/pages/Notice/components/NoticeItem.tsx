import { useEffect, useState, useContext, useCallback } from 'react';
import { fetchPost } from '@/api/notice';
import { IPost } from '@carebell/bell-core';
import Post from './Post';
import Datetime from './Datetime';
import { StyledListItem, StyledLink, ErrorState } from './Notice.style';
import NoticeSkeletonItem from './NoticeSkeletonItem';
import { ErrorContext } from '@/contexts/ErrorContext';
import { NoticeItemProps } from '@/types/Notice/NoticeItem.type';

const NoticeItem = ({ notice }: NoticeItemProps) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const errorContext = useContext(ErrorContext);

  const fetchPostData = useCallback(async () => {
    try {
      const postData = await fetchPost(notice.postUuid);
      setPost(postData);
    } catch (error) {
      console.error(error);
      errorContext?.showError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [notice.postUuid, errorContext]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  if (loading) {
    return <NoticeSkeletonItem />;
  }

  if (!post) {
    return <ErrorState>데이터를 불러올 수 없습니다.</ErrorState>;
  }

  return (
    <StyledListItem>
      <StyledLink to={`/notice/${notice.id}`}>
        <Datetime datetime={notice.updatedAt ?? notice.createdAt} />
        <Post post={post} />
      </StyledLink>
    </StyledListItem>
  );
};

export default NoticeItem;

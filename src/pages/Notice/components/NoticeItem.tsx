import { useEffect, useState, useContext } from 'react';
import { fetchPost } from '@/api/notice';
import { INotice, IPost } from '@carebell/bell-core';
import Post from './Post';
import Datetime from './Datetime';
import { StyledListItem, StyledLink } from './Notice.style';
import NoticeSkeletonItem from './NoticeSkeletonItem';
import { ErrorContext } from '@/contexts/ErrorContext';

interface NoticeResponse {
  notice: INotice;
}

const NoticeItem = ({ notice }: NoticeResponse) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const errorContext = useContext(ErrorContext);

  const fetchPostData = async () => {
    try {
      const postData = await fetchPost(notice.postUuid);
      setPost(postData);
    } catch (error) {
      console.error(error);
      errorContext?.showError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [notice.postUuid]);

  if (loading) {
    return <NoticeSkeletonItem />;
  }

  if (!post) {
    return null;
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

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '@/api/notice';
import { IPost } from '@carebell/bell-core';
import NoticeContent from './components/NoticeDetailContent';
import NoticeTitle from './components/NoticeDetailTitle';
import NoticeDetailPageSkeleton from './components/NoticeDetailPageSkeleton';

const NoticeDetailPage = () => {
  const { postUuid } = useParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (!postUuid) return;
    fetchPost(postUuid).then(setPost);
  }, [postUuid]);

  if (!post) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <Suspense fallback={<NoticeDetailPageSkeleton />}>
      <section>
        <NoticeTitle uuid={post.titleLocalizationUuid} />
        <NoticeContent uuid={post.contentLocalizationUuid} />
      </section>
    </Suspense>
  );
};

export default NoticeDetailPage;

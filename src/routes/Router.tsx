import { Routes, Route } from 'react-router-dom';
import NoticePage from '@/pages/Notice/NoticePage';
import NoticeSkeletonItem from '@/pages/Notice/components/NoticeSkeletonItem';
import NoticePageSkeleton from '@/pages/Notice/components/NoticePageSkeleton';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<NoticePageSkeleton />}
      />
      <Route
        path='/notice'
        element={<NoticePage />}
      />
      <Route
        path='/notice/:id'
        element={<NoticeSkeletonItem />}
      />
    </Routes>
  );
};

export default Router;

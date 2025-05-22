import { Routes, Route } from 'react-router-dom';
import NoticePage from '@/pages/Notice/NoticePage';
// import MainPage from '@/pages/Main/MainPage';
import NoticeDetailPage from '@/pages/NoticeDetail/NoticeDetailPage';
import NoticeDetailPageSkeleton from '@/pages/NoticeDetail/components/NoticeDetailPageSkeleton';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<NoticeDetailPageSkeleton />}
      />
      <Route
        path='/notice'
        element={<NoticePage />}
      />
      <Route
        path='/notice/:postUuid'
        element={<NoticeDetailPage />}
      />
    </Routes>
  );
};

export default Router;

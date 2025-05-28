import { Routes, Route } from 'react-router-dom';

import BaseLayout from '@/layout/BaseLayout';
import MainPage from '@/pages/Main/MainPage';
import NoticePageSkeleton from '@/pages/Notice/components/NoticePageSkeleton';
import NoticePage from '@/pages/Notice/NoticePage';
import NoticeDetailPageSkeleton from '@/pages/NoticeDetail/components/NoticeDetailPageSkeleton';
import NoticeDetailPage from '@/pages/NoticeDetail/NoticeDetailPage';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      />

      <Route element={<BaseLayout />}>
        <Route
          path='/notice'
          element={<NoticePage />}
        />
        <Route
          path='/notice/skeleton'
          element={<NoticePageSkeleton />}
        />
        <Route
          path='/notice/:postUuid'
          element={<NoticeDetailPage />}
        />
        <Route
          path='/notice/:postUuid/skeleton'
          element={<NoticeDetailPageSkeleton />}
        />
      </Route>
    </Routes>
  );
};

export default Router;

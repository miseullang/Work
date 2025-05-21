import { useEffect, useState, useContext } from 'react';
import { fetchNoticeList } from '@/api/notice';
import { INotice } from '@carebell/bell-core';
import NoticeItem from './NoticeItem';
import NoticeSkeletonItem from './NoticeSkeletonItem';
import { ErrorContext } from '@/contexts/ErrorContext';

interface ListResponse {
  count: number;
  rows: INotice[];
}

const NoticeList = () => {
  const [noticeResponse, setNoticeResponse] = useState<ListResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const errorContext = useContext(ErrorContext);

  const fetchNotices = async () => {
    try {
      const response = await fetchNoticeList();
      setNoticeResponse(response);
    } catch (error) {
      console.error(error);
      errorContext?.showError('공지사항 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (loading) {
    return Array.from({ length: 5 }).map((_, index) => (
      <NoticeSkeletonItem key={index} />
    ));
  }

  return (
    <ul>
      {noticeResponse?.rows.map((notice) => (
        <NoticeItem
          key={notice.id}
          notice={{
            id: notice.id,
            postUuid: notice.postUuid,
            updatedAt: notice.updatedAt,
            createdAt: notice.createdAt,
            userUuid: notice.userUuid,
            uuid: notice.uuid,
            visibility: notice.visibility,
            deletedAt: notice.deletedAt,
          }}
        />
      ))}
    </ul>
  );
};

export default NoticeList;

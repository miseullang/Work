import { useEffect, useState, useContext, useCallback } from 'react';
import { fetchNoticeList } from '@/api/notice';
import { INotice } from '@carebell/bell-core';
import NoticeItem from './NoticeItem';
import NoticeSkeletonItem from './NoticeSkeletonItem';
import { ErrorContext } from '@/contexts/ErrorContext';
import { NoticeItemProps } from '@/types/Notice/NoticeItem.type';

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

  const fetchNotices = useCallback(async () => {
    try {
      const response = await fetchNoticeList();
      setNoticeResponse(response);
    } catch (error) {
      console.error(error);
      errorContext?.showError('공지사항 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [errorContext]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

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
          notice={NoticeItemProps(notice)}
        />
      ))}
    </ul>
  );
};

export default NoticeList;

import React from 'react';
import { fetchNoticeList } from '@/api/notice';
import NoticeItem from './NoticeItem';
import NoticeSkeletonItem from './NoticeSkeletonItem';
import { ErrorContext } from '@/contexts/ErrorContext';
import { NoticeListState } from '@/types/Notice/NoticeList.type';

class NoticeList extends React.Component<
  Record<string, never>,
  NoticeListState
> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      noticeResponse: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchNotices();
  }

  fetchNotices = async () => {
    try {
      const response = await fetchNoticeList();
      this.setState({ noticeResponse: response });
    } catch (error) {
      console.error(error);
      this.context?.showError('공지사항 목록을 불러오는데 실패했습니다.');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, noticeResponse } = this.state;

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
            notice={notice}
          />
        ))}
      </ul>
    );
  }
}

export default NoticeList;

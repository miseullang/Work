import React from 'react';

import { useLocation } from 'react-router-dom';

import { fetchNoticeList } from '@/api/notice';
import RouterPagination from '@/components/RouterPagination';
import { ErrorContext } from '@/contexts/ErrorContext';
import {
  NoticeListPaginationProps,
  NoticeListState,
} from '@/types/Notice/NoticeList.type';

import NoticeItem from './NoticeItem';
import NoticeItemSkeleton from './NoticeItemSkeleton';

// useLocation hook 사용 용도의 래퍼 컴포넌트
const NoticeListWrapper: React.FC = () => {
  const location = useLocation();
  return <NoticeListClass location={location} />;
};

class NoticeListClass extends React.Component<
  NoticeListPaginationProps,
  NoticeListState
> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  static readonly ITEMS_PER_PAGE = 2;

  constructor(props: NoticeListPaginationProps) {
    super(props);
    this.state = {
      noticeResponse: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchNotices();
  }

  componentDidUpdate(prevProps: NoticeListPaginationProps) {
    if (
      prevProps.location.search !== this.props.location.search &&
      !this.state.loading
    ) {
      this.fetchNotices();
    }
  }

  getCurrentPage = (): number => {
    const query = new URLSearchParams(this.props.location.search);
    const page = parseInt(query.get('page') || '1', 10);
    return isNaN(page) || page < 1 ? 1 : page;
  };

  fetchNotices = async () => {
    this.setState({ loading: true });

    try {
      const currentPage = this.getCurrentPage();
      const offset = (currentPage - 1) * NoticeListClass.ITEMS_PER_PAGE;

      const response = await fetchNoticeList({
        offset,
        limit: NoticeListClass.ITEMS_PER_PAGE,
      });

      this.setState({ noticeResponse: response });
    } catch (error) {
      if (error instanceof Error) {
        this.context?.showError(error.message);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, noticeResponse } = this.state;

    if (loading) {
      return (
        <ul>
          {Array.from({ length: 5 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))}
        </ul>
      );
    }

    const totalPages = noticeResponse?.count
      ? Math.ceil(noticeResponse.count / NoticeListClass.ITEMS_PER_PAGE)
      : 0;

    return (
      <ul>
        {noticeResponse?.rows.map((notice) => (
          <NoticeItem
            key={notice.id}
            notice={notice}
          />
        ))}
        <RouterPagination
          count={totalPages}
          basePath='/notice'
        />
      </ul>
    );
  }
}

export default NoticeListWrapper;

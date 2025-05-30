import React from 'react';

import { fetchPost } from '@/api/notice';
import { ErrorContext } from '@/contexts/ErrorContext';
import {
  NoticeItemProps,
  NoticeItemState,
} from '@/types/Notice/NoticeItem.type';

import Datetime from './Datetime';
import { StyledListItem, StyledLink, ErrorState } from './Notice.style';
import NoticeItemSkeleton from './NoticeItemSkeleton';
import Post from './Post';

class NoticeItem extends React.Component<NoticeItemProps, NoticeItemState> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  constructor(props: NoticeItemProps) {
    super(props);
    this.state = {
      post: null,
      loading: true,
    };
  }

  shouldComponentUpdate(
    nextProps: NoticeItemProps,
    nextState: NoticeItemState,
  ): boolean {
    if (this.props.notice.postUuid !== nextProps.notice.postUuid) {
      return true;
    }

    if (this.state.loading !== nextState.loading) {
      return true;
    }
    if (this.state.post !== nextState.post) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    this.fetchPostData();
  }

  componentDidUpdate(prevProps: NoticeItemProps) {
    if (prevProps.notice.postUuid !== this.props.notice.postUuid) {
      this.fetchPostData();
    }
  }

  fetchPostData = async () => {
    try {
      const postData = await fetchPost(this.props.notice.postUuid);
      this.setState({ post: postData });
    } catch (error) {
      if (error instanceof Error) {
        this.context?.showError(error.message);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, post } = this.state;
    const { notice } = this.props;

    if (loading) {
      return <NoticeItemSkeleton />;
    }

    if (!post) {
      return <ErrorState>데이터를 불러올 수 없습니다.</ErrorState>;
    }

    return (
      <StyledListItem>
        <StyledLink to={`/notice/${notice.postUuid}`}>
          <Datetime datetime={notice.updatedAt ?? notice.createdAt} />
          <Post post={post} />
        </StyledLink>
      </StyledListItem>
    );
  }
}

export default NoticeItem;

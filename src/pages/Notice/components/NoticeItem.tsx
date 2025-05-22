import React from 'react';
import { fetchPost } from '@/api/notice';
import Post from './Post';
import Datetime from './Datetime';
import { StyledListItem, StyledLink, ErrorState } from './Notice.style';
import NoticeSkeletonItem from './NoticeSkeletonItem';
import { ErrorContext } from '@/contexts/ErrorContext';
import {
  NoticeItemProps,
  NoticeItemState,
} from '@/types/Notice/NoticeItem.type';

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
      console.error(error);
      this.context?.showError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, post } = this.state;
    const { notice } = this.props;

    if (loading) {
      return <NoticeSkeletonItem />;
    }

    if (!post) {
      return <ErrorState>데이터를 불러올 수 없습니다.</ErrorState>;
    }

    return (
      <StyledListItem>
        <StyledLink to={`/notice/${notice.id}`}>
          <Datetime datetime={notice.updatedAt ?? notice.createdAt} />
          <Post post={post} />
        </StyledLink>
      </StyledListItem>
    );
  }
}

export default NoticeItem;

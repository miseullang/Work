import React, { Suspense } from 'react';

import { useParams } from 'react-router-dom';

import { fetchPost } from '@/api/notice';
import { ErrorContext } from '@/contexts/ErrorContext';
import {
  NoticeDetailPageProps,
  NoticeDetailPageState,
} from '@/types/NoticeDetail/NoticeDetailPage.type';

import NoticeContent from './components/NoticeDetailContent';
import NoticeDetailPageSkeleton from './components/NoticeDetailPageSkeleton';
import NoticeTitle from './components/NoticeDetailTitle';

class NoticeDetailPageBase extends React.Component<
  NoticeDetailPageProps,
  NoticeDetailPageState
> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  constructor(props: NoticeDetailPageProps) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    this.fetchPostData();
  }

  componentDidUpdate(prevProps: NoticeDetailPageProps) {
    if (prevProps.postUuid !== this.props.postUuid) {
      this.fetchPostData();
    }
  }

  fetchPostData = async () => {
    const { postUuid } = this.props;
    if (!postUuid) return;

    try {
      const postData = await fetchPost(postUuid);
      this.setState({ post: postData });
    } catch (error) {
      if (error instanceof Error) {
        this.context?.showError(error.message);
      }
    }
  };

  render() {
    const { post } = this.state;

    if (!post) {
      return <div>데이터를 불러올 수 없습니다.</div>;
    }

    return (
      <Suspense fallback={<NoticeDetailPageSkeleton />}>
        <section>
          <NoticeTitle uuid={post.titleLocalizationUuid} />
          <NoticeContent uuid={post.contentLocalizationUuid} />
        </section>
      </Suspense>
    );
  }
}

const NoticeDetailPage = () => {
  const { postUuid } = useParams();
  return <NoticeDetailPageBase postUuid={postUuid} />;
};

export default NoticeDetailPage;

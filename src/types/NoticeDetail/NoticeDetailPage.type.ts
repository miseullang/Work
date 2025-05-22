import { IPost } from '@carebell/bell-core';

export interface NoticeDetailPageProps {
  postUuid?: string;
}

export interface NoticeDetailPageState {
  post: IPost | null;
}

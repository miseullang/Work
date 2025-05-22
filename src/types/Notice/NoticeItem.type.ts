import { INotice, IPost } from '@carebell/bell-core';

export interface NoticeItemProps {
  notice: INotice
}

export interface NoticeItemState {
  post: IPost | null;
  loading: boolean;
}
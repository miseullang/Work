import { INotice, IPost } from '@carebell/bell-core';

export interface NoticeItemProps {
  notice: Pick<
    INotice,
    | 'id'
    | 'postUuid'
    | 'updatedAt'
    | 'createdAt'
    | 'userUuid'
    | 'uuid'
    | 'visibility'
    | 'deletedAt'
  >;
}

export interface NoticeItemState {
  post: IPost | null;
  loading: boolean;
}
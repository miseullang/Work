import { INotice } from '@carebell/bell-core';

export interface NoticeItemProps {
  notice: INotice;
}

export const createNoticeItemProps = (notice: INotice): INotice => ({
  id: notice.id,
  postUuid: notice.postUuid,
  updatedAt: notice.updatedAt,
  createdAt: notice.createdAt,
  userUuid: notice.userUuid,
  uuid: notice.uuid,
  visibility: notice.visibility,
  deletedAt: notice.deletedAt,
});
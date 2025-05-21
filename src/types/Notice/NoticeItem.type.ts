import { INotice } from '@carebell/bell-core';

export const NoticeItemProps = (notice: INotice): INotice => ({
  id: notice.id,
  postUuid: notice.postUuid,
  updatedAt: notice.updatedAt,
  createdAt: notice.createdAt,
  userUuid: notice.userUuid,
  uuid: notice.uuid,
  visibility: notice.visibility,
  deletedAt: notice.deletedAt,
});
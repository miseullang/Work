import { INotice } from '@carebell/bell-core';

export interface NoticeListProps {
  count: number;
  rows: INotice[];
}

export interface NoticeListState {
  noticeResponse: NoticeListProps | null;
  loading: boolean;
}
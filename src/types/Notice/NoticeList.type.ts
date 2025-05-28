import { Location } from 'react-router-dom';

import { INotice } from '@carebell/bell-core';

export interface NoticeListProps {
  count: number;
  rows: INotice[];
}

export interface NoticeListState {
  noticeResponse: NoticeListProps | null;
  loading: boolean;
}

export interface NoticeListPaginationProps {
  location: Location;
}

export interface NoticeListParams {
  offset?: number;
  limit?: number;
  order?: string[];
  include?: string[];
  visibility?: number;
  application?: number;
  createdAt?: string[];
  updatedAt?: string[];
}

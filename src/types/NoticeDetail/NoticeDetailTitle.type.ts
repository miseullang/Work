import { ILocalization } from '@carebell/bell-core';

export interface NoticeTitleProps {
  uuid: string;
}

export interface NoticeDetailTitleState {
  localization: ILocalization | null;
  loading: boolean;
}

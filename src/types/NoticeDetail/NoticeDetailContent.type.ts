import { ILocalization } from '@carebell/bell-core';

export interface NoticeContentProps {
  uuid: string;
}

export interface NoticeDetailContentState {
  localization: ILocalization | null;
  loading: boolean;
}

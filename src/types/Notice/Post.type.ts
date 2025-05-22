import { IPost, ILocalization } from '@carebell/bell-core';

export interface PostProps {
  post: IPost;
}

export interface PostState {
  localization: ILocalization | null;
  loading: boolean;
}

import { INotice, IPost, ILocalization } from '@carebell/bell-core';
import axios, { AxiosError } from 'axios';
import { NoticeListProps } from '@/types/Notice/NoticeList.type';

const BASE_URL = 'https://api.carebell.kr/v2';

const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 401:
        throw new Error('로그인이 필요합니다.');
      case 403:
        throw new Error('접근 권한이 없습니다.');
      case 404:
        throw new Error('데이터를 찾을 수 없습니다.');
      case 500:
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      default:
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
  throw error;
};

export const fetchNoticeList = async (
  params?: INotice,
): Promise<NoticeListProps> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/notice`, { params });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPost = async (postUuid: string): Promise<IPost> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/post/${postUuid}`);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchLocalization = async (
  localizationUuid: string,
): Promise<ILocalization> => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/localization/${localizationUuid}`,
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

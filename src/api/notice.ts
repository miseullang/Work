import { INotice, IPost, ILocalization } from '@carebell/bell-core';
import axios, { AxiosError } from 'axios';
import { noticeList } from '@/mock/Notice/NoticeMockData';
import { mockPosts } from '@/mock/Notice/PostMockData';
import { mockLocalizations } from '@/mock/Notice/LocalizationMockData';

const BASE_URL = 'https://api.carebell.kr/v2';

interface NoticeParams {
  limit?: number;
  offset?: number;
  order?: ['id' | 'desc'][];
  include?: string[];
}

interface ListResponse {
  count: number;
  rows: INotice[];
}

export const fetchNoticeList = async (
  params?: NoticeParams,
): Promise<ListResponse> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/notice`, { params });
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return { count: noticeList.length, rows: noticeList };
    }
    throw error;
  }
};

export const fetchPost = async (postUuid: string): Promise<IPost> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/post/${postUuid}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return mockPosts;
    }
    throw error;
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      return mockLocalizations;
    }
    throw error;
  }
};

export const fetchNoticeWithDetails = async () => {
  try {
    const { rows: notices } = await fetchNoticeList();

    const posts = await Promise.all(
      notices.map(async (notice) => {
        try {
          return await fetchPost(notice.postUuid);
        } catch (error) {
          throw new Error(
            `공지사항 ${notice.id}번의 상세 정보를 불러오는데 실패했습니다.`,
          );
        }
      }),
    );

    const localizations = await Promise.all(
      posts.map(async (post) => {
        if (!post.titleLocalizationUuid) return null;
        try {
          return await fetchLocalization(post.titleLocalizationUuid);
        } catch (error) {
          throw new Error(
            `공지사항 제목의 번역 정보를 불러오는데 실패했습니다.`,
          );
        }
      }),
    );

    return notices.map((notice, index) => ({
      notice,
      post: posts[index],
      localization: localizations[index],
    }));
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          throw new Error('로그인이 필요합니다.');
        case 403:
          throw new Error('접근 권한이 없습니다.');
        case 404:
          throw new Error('데이터를 찾을 수 없습니다.');
        case 500:
          throw new Error(
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          );
        default:
          throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};

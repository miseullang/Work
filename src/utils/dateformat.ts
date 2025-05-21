/**
 * ISO 날짜 문자열을 YYYY-MM-DD 형식으로 변환합니다.
 * @param isoString - ISO 8601 형식의 날짜 문자열 (예: 2024-04-18T07:51:18.000Z)
 * @returns YYYY-MM-DD 형식의 날짜 문자열 (예: 2024-04-18)
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0];
};

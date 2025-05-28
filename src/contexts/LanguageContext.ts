import { LanguageContextType } from '@/types/components/LanguageContext.type';

export const validateLanguageContext = (
  context: LanguageContextType | undefined,
): LanguageContextType => {
  if (!context) {
    throw new Error('LanguageProvider 내에서 컴포넌트를 사용해야 함');
  }
  return context;
};

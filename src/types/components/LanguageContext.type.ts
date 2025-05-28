import { ReactNode } from 'react';

import { ILocalization } from '@carebell/bell-core';

export type Language = 'default' | 'ko' | 'en' | 'ja';

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  getLocalizedContent: (localization: ILocalization | null) => string;
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface LanguageProviderState {
  currentLanguage: Language;
}

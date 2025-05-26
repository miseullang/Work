import React, { createContext, Component } from 'react';

import { ILocalization } from '@carebell/bell-core';

import {
  Language,
  LanguageContextType,
  LanguageProviderProps,
  LanguageProviderState,
} from '@/types/LanguageContext/LanguageContext.type';

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = 'preferred-language';

export class LanguageProvider extends Component<
  LanguageProviderProps,
  LanguageProviderState
> {
  constructor(props: LanguageProviderProps) {
    super(props);

    const savedLanguage = this.getSavedLanguage();

    this.state = {
      currentLanguage: savedLanguage,
    };
  }

  componentDidMount() {
    this.updateDOM(this.state.currentLanguage);
  }

  getSavedLanguage = (): Language => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && ['default', 'ko', 'en', 'ja'].includes(saved)) {
        return saved as Language;
      }
    } catch (error) {
      console.warn('로컬스토리지에서 언어 설정을 불러올 수 없습니다:', error);
    }
    return 'default';
  };

  saveLanguage = (language: Language) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.warn('로컬스토리지에 언어 설정을 저장할 수 없습니다:', error);
    }
  };

  updateDOM = (language: Language) => {
    // HTML lang 속성 변경
    if (language !== 'default') {
      document.documentElement.lang = language;
    } else {
      document.documentElement.lang = 'ko';
    }

    // body 클래스 변경
    const bodyElement = document.body;
    bodyElement.className = bodyElement.className.replace(/lang-\w+/g, '');

    if (language !== 'default') {
      bodyElement.classList.add(`lang-${language}`);
    } else {
      bodyElement.classList.add('lang-ko');
    }
  };

  setLanguage = (language: Language) => {
    this.setState({ currentLanguage: language });
    this.updateDOM(language);
    this.saveLanguage(language);
  };

  getLocalizedContent = (localization: ILocalization | null): string => {
    if (!localization) return '';

    // 선택된 언어에 따라 해당 속성 반환
    if (this.state.currentLanguage === 'default') {
      return localization.default || '';
    }

    return (
      localization[this.state.currentLanguage] || localization.default || ''
    );
  };

  render() {
    const contextValue: LanguageContextType = {
      currentLanguage: this.state.currentLanguage,
      setLanguage: this.setLanguage,
      getLocalizedContent: this.getLocalizedContent,
    };

    return (
      <LanguageContext.Provider value={contextValue}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export function withLanguage<P extends object>(
  WrappedComponent: React.ComponentType<P & LanguageContextType>,
) {
  return class WithLanguageComponent extends Component<P> {
    static contextType = LanguageContext;
    declare context: React.ContextType<typeof LanguageContext>;

    render() {
      if (!this.context) {
        throw new Error('withLanguage must be used within a LanguageProvider');
      }

      return (
        <WrappedComponent
          {...(this.props as P)}
          {...this.context}
        />
      );
    }
  };
}

export const useLanguage = (): LanguageContextType => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('언어 컨텍스트가 없습니다.');
  }
  return context;
};

export { LanguageContext };

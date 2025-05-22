import { ReactNode } from 'react';

export interface ErrorContextType {
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

export interface ErrorProviderProps {
  children: ReactNode;
}
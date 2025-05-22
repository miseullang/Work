import { ReactNode } from 'react';

export interface ErrorContextType {
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

export interface ErrorProviderProps {
  children: ReactNode;
}

export interface ErrorState {
  toast: {
    open: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info';
  };
}
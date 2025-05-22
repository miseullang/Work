import { createContext, useState } from 'react';
import Toast from '@/components/Toast';
import {
  ErrorContextType,
  ErrorProviderProps,
} from '@/types/ErrorContext/ErrorContext.type';

export const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'warning' | 'info',
  });

  const showMessage = (
    message: string,
    severity: 'error' | 'warning' | 'info',
  ) => {
    setToast({ open: true, message, severity });
  };

  const handleClose = () => setToast((prev) => ({ ...prev, open: false }));

  return (
    <ErrorContext.Provider
      value={{
        showError: (msg) => showMessage(msg, 'error'),
        showWarning: (msg) => showMessage(msg, 'warning'),
        showInfo: (msg) => showMessage(msg, 'info'),
      }}>
      {children}
      <Toast
        {...toast}
        onClose={handleClose}
      />
    </ErrorContext.Provider>
  );
};

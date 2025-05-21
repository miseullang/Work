import { createContext, useState, ReactNode } from 'react';
import Toast from '@/components/Toast';

interface ErrorContextType {
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

export const ErrorContext = createContext<ErrorContextType | null>(null);

interface ErrorProviderProps {
  children: ReactNode;
}

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

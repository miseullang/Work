import React from 'react';
import { createContext } from 'react';

import Toast from '@/components/Toast';
import {
  ErrorContextType,
  ErrorProviderProps,
  ErrorState,
} from '@/types/components/ErrorContext.type';

export const ErrorContext = createContext<ErrorContextType | null>(null);


export class ErrorProvider extends React.Component<
  ErrorProviderProps,
  ErrorState
> {
  constructor(props: ErrorProviderProps) {
    super(props);
    this.state = {
      toast: {
        open: false,
        message: '',
        severity: 'error',
      },
    };
  }

  showMessage = (message: string, severity: 'error' | 'warning' | 'info') => {
    this.setState({
      toast: { open: true, message, severity },
    });
  };

  handleClose = () => {
    this.setState((prevState) => ({
      toast: { ...prevState.toast, open: false },
    }));
  };

  render() {
    const contextValue: ErrorContextType = {
      showError: (msg) => this.showMessage(msg, 'error'),
      showWarning: (msg) => this.showMessage(msg, 'warning'),
      showInfo: (msg) => this.showMessage(msg, 'info'),
    };

    return (
      <ErrorContext.Provider value={contextValue}>
        {this.props.children}
        <Toast
          {...this.state.toast}
          onClose={this.handleClose}
        />
      </ErrorContext.Provider>
    );
  }
}

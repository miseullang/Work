import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { ToastProps } from '@/types/Toast/Toast.type';

class Toast extends React.Component<ToastProps> {
  render() {
    const { open, message, severity, onClose } = this.props;

    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          severity={severity}
          onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default Toast;

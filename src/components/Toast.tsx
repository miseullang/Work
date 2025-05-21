import { Alert, Snackbar } from '@mui/material';

interface ToastProps {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose: () => void;
}

const Toast = ({ open, message, severity, onClose }: ToastProps) => (
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

export default Toast;

import { Alert, Snackbar } from '@mui/material';
import { ToastProps } from '@/types/Toast/Toast.type';

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

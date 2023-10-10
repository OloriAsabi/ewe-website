import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastNotificationProps {
  description: string;
  status: string;
  onClose?: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ description, status, onClose }) => {
  const toast = useToast();

  useEffect(() => {
    const showToast = () => {
      toast({
        title: description,
        duration: 5000,
        position: 'top',
        status: status === 'success' ? 'success' : status === 'error' ? 'error' : status === 'info' ? 'info' : 'warning',
        onCloseComplete: onClose,
      });
    };

    showToast();
  }, [description, status, toast, onClose]);

  return null;
};

export default ToastNotification;
import React, { useState, useContext, useCallback } from 'react';

import { Children } from '@/types/types';

type ToastContextState = {
  showToastMessage: (text: string, error?: boolean) => void;
  isShow: boolean;
  text: string;
  error: boolean;
};
const ToastContext = React.createContext<ToastContextState | undefined>(undefined);

export const ToastProvider: React.FC<Children> = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const showToastMessage = useCallback((text: string, error: boolean | undefined) => {
    if (error) {
      setError(true);
    }
    setText(text);

    setTimeout(() => {
      setIsShow(true);
    }, 200);
  }, []);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isShow) {
      timer = setTimeout(() => {
        setIsShow(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isShow]);

  return <ToastContext.Provider value={{ showToastMessage, isShow, text, error }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

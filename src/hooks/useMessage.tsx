import React, { useState, useCallback } from 'react';

import PortalToasty from '@/components/elements/message/PortalToasty';

type messageHookType = () => {
  MessageModal: React.FC;
  toggleShow: (text: string) => void;
  showMessage: (text: string) => void;
};

export const useMessage: messageHookType = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const showMessage = useCallback((text: string) => {
    setText(text);
    setShow(true);
  }, []);

  const toggleShow = useCallback((text: string) => {
    setText(text);
    setShow((prev) => !prev);
  }, []);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      timer = setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [show]);

  const MessageModal: React.FC = () => <PortalToasty show={show} text={text} />;
  return { toggleShow, showMessage, MessageModal };
};

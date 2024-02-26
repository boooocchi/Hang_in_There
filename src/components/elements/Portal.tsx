import React from 'react';
import ReactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
  selector: string;
};

const ClientPortal = ({ children, selector }: Props): React.ReactPortal | null => {
  const ref = React.useRef<Element>();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const elm = document.querySelector(selector);
    if (elm) {
      ref.current = elm;
      setMounted(true);
    }
  }, [selector]);

  return mounted && ref.current ? ReactDom.createPortal(children, ref.current) : null;
};

export default ClientPortal;

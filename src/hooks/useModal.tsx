import React from 'react';

import ClientPortal from '@/components/portal/Portal';

type ModalHook = () => {
  Modal: React.FC<ModalProps>;
  toggleModal: () => void;
  closeModal: () => void;
  openModal: () => void;
};

type ModalProps = {
  children: string | React.ReactNode;
  onClick?: () => void;
  buttonLabel?: string | React.ReactNode;
};

export const useModal: ModalHook = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(true);
      }
    },
    [setIsOpen],
  );

  const ModalComponent = React.useMemo(
    () =>
      function ModalComponent({ children }: ModalProps): JSX.Element {
        return (
          <>
            {isOpen && (
              <ClientPortal selector="#myportal">
                <div
                  onKeyDown={(e) => handleKeyDown(e)}
                  tabIndex={0}
                  role="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-black opacity-50 xs:h-screen h-svh w-screen left-0 top-0 fixed z-[998]"
                ></div>
                {children}
              </ClientPortal>
            )}
          </>
        );
      },
    [handleKeyDown, isOpen],
  );

  return { Modal: ModalComponent, toggleModal, closeModal, openModal };
};

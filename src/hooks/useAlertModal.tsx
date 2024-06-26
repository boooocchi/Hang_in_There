import React from 'react';

import Button from '@/components/elements/button/Button';
import { AlertIllusration } from '@/constants/icons/icons';

import ClientPortal from '../components/portal/Portal';

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

export const useAlertModal: ModalHook = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const ModalComponent = React.useMemo(
    () =>
      function ModalComponent({ children, onClick, buttonLabel }: ModalProps): JSX.Element {
        return (
          <>
            {isOpen && (
              <ClientPortal selector="#myportal">
                <div className="bg-black opacity-50 h-screen w-screen left-0 top-0 fixed z-[998]"></div>
                <div className=" xs:w-[500px] w-[90%] bg-gray rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-lg flex flex-col justify-center gap-3  fixed z-[999] ">
                  <div className="flex justify-center mb-3">{children}</div>
                  <div className="flex justify-center">
                    <AlertIllusration />
                  </div>

                  <div className="flex justify-between gap-sm">
                    <Button style="w-full" colorSchema="accentOrange" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button style="w-full" onClick={onClick}>
                      {buttonLabel}
                    </Button>
                  </div>
                </div>
              </ClientPortal>
            )}
          </>
        );
      },
    [isOpen],
  );

  return { Modal: ModalComponent, toggleModal, closeModal, openModal };
};

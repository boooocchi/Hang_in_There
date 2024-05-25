import React from 'react';

import ClientPortal from '../Portal';

type SearchResultModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const SearchResultModal: React.FC<SearchResultModalProps> = ({ isModalOpen, setIsModalOpen, children }) => {
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    },
    [setIsModalOpen],
  );
  return (
    <>
      {isModalOpen && (
        <ClientPortal selector="#myportal">
          <div
            onKeyDown={(e) => handleKeyDown(e)}
            tabIndex={0}
            role="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-black opacity-50 xs:h-screen h-svh w-screen left-0 top-0 fixed z-[998]"
          ></div>
          {children}
        </ClientPortal>
      )}
    </>
  );
};

export default SearchResultModal;

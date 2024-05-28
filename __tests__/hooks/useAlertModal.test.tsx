import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { useAlertModal } from '@/hooks/useAlertModal';

const TestModalComponent: React.FC = () => {
  const { Modal, toggleModal, closeModal, openModal } = useAlertModal();

  return (
    <div>
      <Modal onClick={() => closeModal()} buttonLabel="test button label">
        <h1>Test Modal Title</h1>
      </Modal>
      <button onClick={toggleModal}>toggle button</button>
      <button onClick={openModal}>open button</button>
      <button onClick={closeModal}>close button</button>
      <div id="myportal" />
    </div>
  );
};

describe('useModal', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<TestModalComponent />);
  });
  afterEach(() => {
    cleanup();
  });

  it('should open and close the modal when user clicks the open and close buttons', async () => {
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();

    const openButton = screen.getByText('open button');
    await user.click(openButton);
    expect(await screen.findByText('Test Modal Title')).toBeInTheDocument();

    const closeButton = screen.getByText('close button');
    await user.click(closeButton);
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
  });

  it('should toggle the modal when user clicks the toggle button', async () => {
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: /toggle button/i });
    await user.click(toggleButton);
    expect(await screen.findByText('Test Modal Title')).toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
  });

  it('should call onClick function and close the modal when user clicks the button inside the modal', async () => {
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();

    const openButton = screen.getByText('open button');
    await user.click(openButton);
    expect(await screen.findByText('Test Modal Title')).toBeInTheDocument();

    const testButton = screen.getByRole('button', { name: /test button label/i });
    await user.click(testButton);
    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
  });
});

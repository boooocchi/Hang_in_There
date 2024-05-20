import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router'; // Import useRouter to mock it
import { useSession } from 'next-auth/react';

import { useAuth } from '@/hooks/useAuth';

jest.mock('next-auth/react');
jest.mock('next/router');

describe('useAuth', () => {
  //useSession and useRouter are mocked
  const mockUseSession = useSession as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  // Mock the push function from useRouter
  const pushMock = jest.fn();
  mockUseRouter.mockReturnValue({
    push: pushMock,
  });

  afterEach(() => {
    //mockUseSession returns different values in each test, so it should be reset after each test
    mockUseSession.mockReset();
  });

  it('when status is not loading or unauthenticated, it should return session, status and userId', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'dummyId',
        },
      },
      status: 'authenticated',
    });
    const { result } = renderHook(() => useAuth());
    const { session, status, userId } = result.current;

    expect(session).toStrictEqual({ user: { id: 'dummyId' } });
    expect(status).toBe('authenticated');
    expect(userId).toBe('dummyId');
  });
  it('when status is unauthenticated, router.push is called', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    renderHook(() => useAuth());

    expect(pushMock).toHaveBeenCalledWith('/auth/signin');
  });
  it('when status is loading, it should return loading as status', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });
    const { result } = renderHook(() => useAuth());
    const { status } = result.current;
    expect(status).toBe('loading');
  });
});

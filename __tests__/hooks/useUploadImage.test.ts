import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useUploadImage } from '@/hooks/useUploadImage';

describe('useUploadImage', () => {
  it('should return imageFile, setImageFile, isDropzone, setIsDropzone, and handleFileSelect', () => {
    const setImageUrl = jest.fn();
    const { result } = renderHook(() => useUploadImage({ setImageUrl }));
    const { imageFile, setImageFile, isDropzone, setIsDropzone, handleFileSelect } = result.current;

    expect(imageFile).toBeNull();
    expect(setImageFile).toBeInstanceOf(Function);
    expect(isDropzone).toBe(false);
    expect(setIsDropzone).toBeInstanceOf(Function);
    expect(handleFileSelect).toBeInstanceOf(Function);
  });

  it('setImageUrl should be called with the correct imageUrl and imageFile state is updated when handleFileSelect is called', async () => {
    const setImageUrl = jest.fn();
    const dummyFile = new File([''], 'test.png', { type: 'image/png' });

    const { result: result } = renderHook(() => useUploadImage({ setImageUrl }));

    await act(async () => {
      result.current.handleFileSelect(dummyFile);
    });

    expect(setImageUrl).toHaveBeenCalledWith('set');
    expect(result.current.imageFile).toEqual(dummyFile);
  });
});

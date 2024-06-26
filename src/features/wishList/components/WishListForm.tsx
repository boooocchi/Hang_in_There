import { useMutation } from '@apollo/client';
import { Categories } from '@prisma/client';
import React from 'react';

import Button from '@/components/elements/button/Button';
import { CancelIcon } from '@/constants/icons/icons';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/errorHandler';

import { WISH_LIST_ADD_MUTATION, WISH_LIST_UPDATE_MUTATION } from '../graphql/mutation';
import { FormProps } from '../types/types';
import { cacheUpdateFunction } from '../utils/utils';

const WishListForm: React.FC<FormProps> = ({
  categoryName,
  editItemId,
  setEditItemId,
  setIsWishListForm,
  register,
  handleSubmit,
  errors,
}) => {
  const { userId } = useAuth();
  const { addToastMessage } = useToast();

  const [addListItem] = useMutation(WISH_LIST_ADD_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'ADD', userId),
  });

  const [updateListItem] = useMutation(WISH_LIST_UPDATE_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'UPDATE', userId),
  });

  const onSubmit = async (data: { itemName: string; category: Categories }) => {
    if (editItemId) {
      try {
        await updateListItem({
          variables: {
            id: editItemId,
            itemName: data.itemName,
          },
        });
        addToastMessage('Item name edited!!');
        setEditItemId('');
      } catch (error) {
        setEditItemId('');
        addToastMessage(getErrorMessage(error), true);
      } finally {
        setIsWishListForm(false);
      }
    } else {
      try {
        await addListItem({
          variables: {
            itemName: data.itemName,
            category: categoryName,
            userId: userId,
          },
        });
        addToastMessage('Item added!!');
      } catch (error) {
        addToastMessage(getErrorMessage(error), true);
      } finally {
        setIsWishListForm(false);
      }
    }
  };
  if (!userId) return null;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray  flex flex-col items-center justify-center  p-md rounded-lg absolute top-1/2 translate-y-[-50%] gap-4   w-4/5 left-1/2 translate-x-[-50%]"
    >
      <button
        className="rounded-full h-5 w-5 flex justify-center items-center bg-accentOrange leading-[10px] text-gray absolute -top-2 -right-2 text-sm shadow-sm"
        onClick={() => {
          setIsWishListForm(false);
          setEditItemId('');
        }}
      >
        <CancelIcon style="w-4 h-4" />
      </button>
      <div className="relative  flex flex-col items-center justify-center w-full">
        <label htmlFor="wishListInput" className="text-center w-full font-bold mb-1 text-base">
          Item name
        </label>
        <input
          id="wishListInput"
          type="text"
          className="border-1 border-middleGreen bg-gray rounded-md mt-1 text-lg w-full py-sm px-md"
          {...register('itemName')}
        />
        {errors.itemName && (
          <p className="absolute -bottom-5 left-1 text-errorRed text-sm">{errors.itemName.message}</p>
        )}
      </div>
      <Button style="w-full text-sm">{editItemId ? 'Edit Item' : 'Add Item'}</Button>
    </form>
  );
};

export default WishListForm;

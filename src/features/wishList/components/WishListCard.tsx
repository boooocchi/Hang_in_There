import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EditIcon, PlusIcon, TrashbinIcon } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/errorHandler';

import { WISH_LIST_DELETE_MUTATION, WISH_LIST_STATUS_UPDATE } from '../graphql/mutation';
import { WISH_LIST_QUERY } from '../graphql/query';
import { CardProps, ListItemType, addItemValues } from '../types/types';
import { cacheUpdateFunction } from '../utils/utils';
import { wishListValidationSchema } from '../validation/wishListValidationSchema';

import WishListForm from './WishListForm';

const WishListCard: React.FC<CardProps> = ({ categoryName }) => {
  const { userId } = useAuth();
  const { addToastMessage } = useToast();
  const [isWishListForm, setIsWishListForm] = React.useState(false);
  const [editItemId, setEditItemId] = React.useState('');

  const { data: listItemsData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId,
    },
  });
  const [updateItemStatus] = useMutation(WISH_LIST_STATUS_UPDATE, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'STATUS_UPDATE', userId),
  });
  const [deleteListItem] = useMutation(WISH_LIST_DELETE_MUTATION, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'DELETE', userId),
  });

  const { register, handleSubmit, formState, setValue, reset } = useForm<addItemValues>({
    defaultValues: {
      itemName: '',
      category: categoryName,
    },
    resolver: yupResolver(wishListValidationSchema),
  });
  const { errors } = formState;

  const handleDelete = async (id: string) => {
    try {
      await deleteListItem({
        variables: {
          id,
        },
      });
      addToastMessage('Item deleted!!');
    } catch (error) {
      addToastMessage(getErrorMessage(error), true);
    }
  };

  const handleEdit = (itemName: string, itemId: string) => {
    reset();
    setEditItemId(itemId);
    setIsWishListForm(true);
    setValue('itemName', itemName);
  };

  const handleItemStatus = async (id: string, checked: boolean) => {
    if (!checked) {
      try {
        await updateItemStatus({
          variables: {
            id,
            checked: true,
          },
        });
      } catch (error) {
        addToastMessage(getErrorMessage(error), true);
      }
    }
  };

  return (
    <div className="flex xs:h-[400px] h-[300px] w-full bg-transparent">
      <div className=" w-[98%] h-[98%] rounded-lg bg-gray flex flex-col pt-lg pb-md px-lg gap-2 relative shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)]">
        {isWishListForm && <div className="absolute bg-black top-0 left-0 rounded-md opacity-30 w-full h-full"></div>}
        <h2 className="text-lg font-boldest text-center mb-1">{categoryName}</h2>
        <ul className="flex flex-col gap-2  h-2/3  overflow-y-scroll hide-scrollbar">
          {listItemsData?.wishList.map((item: ListItemType) => {
            if (item.category === categoryName && !item.checked) {
              return (
                <li key={item.id} className="flex gap-2 justify-between border-dotted border-b border-middleGreen">
                  <div className="flex gap-3 items-center overflow-hidden h-7">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-accentOrange border-accentOrange
                    focus:ring-0 outline-none rounded-sm form-checkbox"
                      onChange={() => handleItemStatus(item.id, item.checked)}
                    />
                    <p className="truncate">{item.itemName}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleEdit(item.itemName, item.id);
                      }}
                    >
                      <EditIcon style="w-4 h-4"></EditIcon>
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      <TrashbinIcon style="w-4 h-4"></TrashbinIcon>
                    </button>
                  </div>
                </li>
              );
            }
          })}
          {isWishListForm && (
            <WishListForm
              categoryName={categoryName}
              editItemId={editItemId}
              setEditItemId={setEditItemId}
              setIsWishListForm={setIsWishListForm}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            ></WishListForm>
          )}
        </ul>
        {!isWishListForm && (
          <div className="flex justify-end w-full mt-auto">
            <button
              className="w-10 h-10 rounded-full flex justify-center items-center  text-accentOrange font-bold text-lg hover:bg-accentOrange border-2  border-accentOrange group hover:border-transparent duration-300"
              onClick={() => {
                setIsWishListForm(true);
                reset();
              }}
            >
              <PlusIcon style="w-5 h-5 stroke-accentOrange group-hover:stroke-gray duration-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListCard;

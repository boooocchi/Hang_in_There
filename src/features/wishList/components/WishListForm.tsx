import { gql, useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Categories } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import { useToast } from '@/hooks/ToastContext';
import { useAuth } from '@/hooks/useAuth';

import { wishListValidationSchema } from '../validation/wishListValidationSchema';

const WISH_LIST_ADD_MUTATION = gql`
  mutation Mutation($itemName: String!, $category: Categories!, $userId: String!) {
    add_wish_list(itemName: $itemName, category: $category, userId: $userId) {
      id
    }
  }
`;

const WISH_LIST_DELETE_MUTATION = gql`
  mutation Mutation($id: String!) {
    delete_wish_list(id: $id) {
      id
    }
  }
`;

export const WISH_LIST_QUERY = gql`
  query WishList($userId: String!) {
    wishList(userId: $userId) {
      category
      checked
      id
      itemName
    }
  }
`;

const WISH_LIST_UPDATE_MUTATION = gql`
  mutation Update_wish_list_name($id: String!, $itemName: String!) {
    update_wish_list_name(id: $id, itemName: $itemName) {
      id
    }
  }
`;

const WISH_LIST_STATUS_UPDATE = gql`
  mutation Update_wish_list_status($id: String!, $checked: Boolean!) {
    update_wish_list_status(id: $id, checked: $checked) {
      id
    }
  }
`;

type ListItemType = {
  category: Categories;
  checked: boolean;
  id: string;
  itemName: string;
};

type Props = {
  categoryName: Categories;
};
type addItemValues = {
  itemName: string;
  category: Categories;
};

const WishListForm: React.FC<Props> = ({ categoryName }) => {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const { showToastMessage } = useToast();

  const [isWishListForm, setIsWishListForm] = React.useState(false);
  const [editItemId, setEditItemId] = React.useState('');

  const [addListItem] = useMutation(WISH_LIST_ADD_MUTATION);
  const [deleteListItem] = useMutation(WISH_LIST_DELETE_MUTATION);
  const [updateListItem] = useMutation(WISH_LIST_UPDATE_MUTATION);
  const [updateItemStatus] = useMutation(WISH_LIST_STATUS_UPDATE);

  const { data: listItemsData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId,
    },
  });

  const { register, handleSubmit, formState, setValue, reset } = useForm<addItemValues>({
    defaultValues: {
      itemName: '',
      category: categoryName,
    },
    resolver: yupResolver(wishListValidationSchema),
  });
  const { errors } = formState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (editItemId) {
      try {
        await updateListItem({
          variables: {
            id: editItemId,
            itemName: data.itemName,
          },
          refetchQueries: [
            {
              query: WISH_LIST_QUERY,
              variables: { userId },
            },
          ],
        });
        showToastMessage('Item name edited!!');

        setIsWishListForm(false);
        setEditItemId('');
      } catch {
        setEditItemId('');
        console.error('error');
        setIsWishListForm(false);
        showToastMessage('Failed to edit the item name');
      }
    } else {
      try {
        await addListItem({
          variables: {
            itemName: data.itemName,
            category: categoryName,
            userId: userId,
          },
          refetchQueries: [
            {
              query: WISH_LIST_QUERY,
              variables: { userId },
            },
          ],
        });
        setIsWishListForm(false);
        showToastMessage('Item added!!');
      } catch {
        console.error('error');
        showToastMessage('Failed to add an item');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteListItem({
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: WISH_LIST_QUERY,
            variables: { userId },
          },
        ],
      });
      showToastMessage('Item deleted!!');
    } catch {
      console.error('error');
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
          refetchQueries: [
            {
              query: WISH_LIST_QUERY,
              variables: { userId },
            },
          ],
        });
      } catch {
        console.error('error');
      }
    }
  };

  return (
    <div className=" w-full h-[400px] rounded-md bg-lightGreen pt-lg pb-md px-lg flex flex-col gap-3 relative">
      {isWishListForm && <div className="absolute bg-black top-0 left-0 rounded-md opacity-30 w-full h-full"></div>}
      <h2 className="text-lg font-boldest text-center mb-3">- {categoryName} -</h2>
      <ul className="flex flex-col gap-2  h-2/3  overflow-y-scroll hide-scrollbar">
        {listItemsData?.wishList.map((item: ListItemType) => {
          if (item.category === categoryName && !item.checked) {
            return (
              <li key={item.id} className="flex gap-2 justify-between">
                <div className="flex gap-3 items-center overflow-hidden">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accentOrange border-none
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          }
        })}
        {isWishListForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray  flex flex-col items-center justify-center  p-md rounded-lg absolute top-1/2 translate-y-[-50%] gap-4   w-4/5 left-1/2 translate-x-[-50%]"
          >
            <button
              className="rounded-full   h-5 w-5 flex justify-center items-center bg-accentOrange leading-[10px] text-white absolute -top-2 -right-2 text-sm shadow-sm"
              onClick={() => {
                setIsWishListForm(false);
                setEditItemId('');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative  flex flex-col items-center justify-center w-full">
              <label htmlFor="wishListInput" className="text-center w-full">
                Item name
              </label>
              <input
                id="wishListInput"
                type="text"
                className="border-b border-lightGreen bg-lightGreen rounded-md mt-1 text-lg w-full py-xs px-sm"
                {...register('itemName')}
              />
              {errors.itemName && (
                <p className="absolute -bottom-5 left-1 text-errorRed text-sm">{errors.itemName.message}</p>
              )}
            </div>
            <Button classname="w-full text-sm">{editItemId ? 'Edit Item' : 'Add Item'}</Button>
          </form>
        )}
      </ul>
      {!isWishListForm && (
        <div className="flex justify-end w-full">
          <button
            className="w-10 h-10 bg-accentOrange rounded-full flex justify-center items-center  text-white font-bold text-lg hover:bg-white group hover:border-accentOrange hover:border-2 "
            onClick={() => {
              setIsWishListForm(true);
              reset();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              className="w-5 h-5 stroke-current group-hover:stroke-accentOrange"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default WishListForm;

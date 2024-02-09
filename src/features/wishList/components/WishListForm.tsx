import { gql, useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Categories } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import { useAuth } from '@/hooks/useAuth';

import { wishListValidationSchema } from '../validation/wishListValidationSchema';

const WISH_LIST_ADD_MUTATION = gql`
  mutation Mutation($itemName: String!, $category: Categories!, $userId: String!) {
    add_wish_list(itemName: $itemName, category: $category, userId: $userId) {
      id
    }
  }
`;

const WISH_LIST_QUERY = gql`
  query WishList($userId: String!) {
    wishList(userId: $userId) {
      category
      checked
      id
      itemName
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

  const [isWishListForm, setIsWishListForm] = React.useState(false);

  const [addListItem] = useMutation(WISH_LIST_ADD_MUTATION);
  const { data: listItemsData } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId,
    },
  });

  const { register, handleSubmit, formState } = useForm<addItemValues>({
    defaultValues: {
      itemName: '',
      category: categoryName,
    },
    resolver: yupResolver(wishListValidationSchema),
  });
  const { errors } = formState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    try {
      addListItem({
        variables: {
          itemName: data.itemName,
          category: categoryName,
          userId: userId,
        },
      });
    } catch {
      console.error('error');
    }
  };

  return (
    <div className="w-full h-[400px] rounded-md bg-lightGreen py-lg px-lg">
      <h2 className="text-lg font-boldest text-center mb-5">- {categoryName} -</h2>
      <ul className="flex flex-col gap-2 relative h-4/5">
        {listItemsData?.wishList.map((item: ListItemType) => {
          if (item.category === categoryName) {
            return (
              <li key={item.id} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-accentOrange border-none
                          focus:ring-0 ring-0 outline-none rounded-sm form-checkbox"
                />
                <p>{item.itemName}</p>
              </li>
            );
          }
        })}
        {isWishListForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray  flex flex-col items-center justify-center w-full p-md rounded-md absolute top-1/2 translate-y-[-60%] gap-4 shadow-sm"
          >
            <button
              className="rounded-full   h-5 w-5 flex justify-center items-center bg-accentOrange leading-[10px] text-white absolute -top-2 -right-2 text-sm shadow-sm"
              onClick={() => {
                setIsWishListForm(false);
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
            <Button classname="w-full text-sm">Add Item</Button>
          </form>
        )}
        {!isWishListForm && (
          <button
            className="w-10 h-10 bg-accentOrange rounded-full flex justify-center items-center  text-white font-bold text-lg hover:bg-white group hover:border-accentOrange hover:border-2 absolute bottom-0 right-0"
            onClick={() => {
              setIsWishListForm(true);
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
        )}
      </ul>
    </div>
  );
};

export default WishListForm;

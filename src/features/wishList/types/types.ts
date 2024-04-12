import { Categories } from '@prisma/client';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export type ListItemType = {
  category: Categories;
  checked: boolean;
  id: string;
  itemName: string;
};

export type CardProps = {
  categoryName: Categories;
};

export type FormProps = {
  categoryName: Categories;
  editItemId: string;
  setEditItemId: React.Dispatch<React.SetStateAction<string>>;
  setIsWishListForm: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<addItemValues>;
  handleSubmit: UseFormHandleSubmit<addItemValues, undefined>;
  errors: FieldErrors<addItemValues>;
};

export type addItemValues = {
  itemName: string;
  category: Categories;
};

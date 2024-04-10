import { Categories } from '@prisma/client';

export type ListItemType = {
  category: Categories;
  checked: boolean;
  id: string;
  itemName: string;
};

export type Props = {
  categoryName: Categories;
};

export type addItemValues = {
  itemName: string;
  category: Categories;
};

import React from 'react';

export const useWishListState = () => {
  const [isWishListForm, setIsWishListForm] = React.useState(false);
  const [editItemId, setEditItemId] = React.useState('');

  return {
    isWishListForm,
    setIsWishListForm,
    editItemId,
    setEditItemId,
  };
};

import { Categories } from '@prisma/client';
import React from 'react';

import WishListForm from './WishListForm';

const WishListSection = () => {
  const categories = Object.values(Categories);
  return (
    <section className="grid grid-cols-3 gap-5 h-full overflow-y-scroll">
      {categories.map((category, item) => (
        <WishListForm categoryName={category} key={item} />
      ))}
    </section>
  );
};

export default WishListSection;

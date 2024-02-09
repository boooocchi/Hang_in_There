import { Categories } from '@prisma/client';

export const upperCamelCase = (str: Categories) => {
  switch (str) {
    case Categories.LIGHTTOPS:
      return 'Light Tops';
    case Categories.HEAVYTOPS:
      return 'Heavy Tops';
    case Categories.OUTERWEAR:
      return 'Outerwear';
    case Categories.BOTTOMS:
      return 'Bottoms';
    case Categories.SHOES:
      return 'Shoes';
    case Categories.ACCESSORIES:
      return 'Accessories';
    default:
      return str;
  }
};

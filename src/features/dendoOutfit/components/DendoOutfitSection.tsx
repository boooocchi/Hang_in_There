import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useAuth } from '@/hooks/useAuth';
import { dateFormatter } from '@/utils/formatDate';

import RegisterOutfitBtn from './elements/RegisterOutfitBtn';

type dendoOutfitType = {
  id: string;
  createdAt: string;
  keywords: string;
  title: string;
  imageUrl: string;
};

const DENDOOUTFIT_QUERY = gql`
  query DendoOutfits($userId: String!) {
    dendoOutfits(userId: $userId) {
      id
      createdAt
      keywords
      title
      imageUrl
    }
  }
`;

const DendoOutfitSection = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const { data } = useQuery(DENDOOUTFIT_QUERY, {
    variables: { userId },
  });
  return (
    <div className="grid grid-cols-4 gap-5 rounded-md overflow-hidden">
      {data?.dendoOutfits.map((dendoOutfit: dendoOutfitType, index: number) => {
        return (
          <div key={index}>
            <div className="aspect-[3/4] w-full overflow-hidden relative rounded-md group">
              <Link href={`/dendoOutfit/${userId}/${dendoOutfit.id}`}>
                <Image
                  src={dendoOutfit.imageUrl ? dendoOutfit.imageUrl : '/image/home/dendo_outfit.jpg'}
                  alt="dendo outfit"
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-110  transition-all duration-200 ease-in grayscale-[0.2]"
                />
              </Link>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="mt-1" key={dendoOutfit.id}>
                {dendoOutfit.title}
              </p>
              <span className="text-xs ml-auto">{dateFormatter(new Date(dendoOutfit.createdAt))}</span>
            </div>
          </div>
        );
      })}
      <RegisterOutfitBtn />
    </div>
  );
};

export default DendoOutfitSection;

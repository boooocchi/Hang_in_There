import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

import Loading from '@/components/elements/message/Loading';

type ImageProps = {
  id?: string;
  url: string;
  alt: string;
  style?: string;
};

const ImageWithLoading: React.FC<ImageProps> = ({ url, alt, style }) => {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

  return (
    <>
      {!imageLoaded && <Loading size="large" />}
      <Image
        src={url}
        alt={alt}
        fill={true}
        style={{ objectFit: 'cover' }}
        className={cn('rounded-md', { 'opacity-0': !imageLoaded }, style)}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  );
};

export default ImageWithLoading;

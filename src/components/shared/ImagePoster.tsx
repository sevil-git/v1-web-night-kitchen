import React from 'react';
import Image from 'next/image';

interface ImagePosterProps {
  imageUrl: string;
  alt?: string;
  height?: string;
}

export function ImagePoster({ imageUrl, alt = 'Banner', height = 'h-64' }: ImagePosterProps) {
  return (
    <div className={`w-full ${height} rounded-xl overflow-hidden relative`}>
      <Image 
        src={imageUrl} 
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}

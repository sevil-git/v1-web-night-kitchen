import React from 'react';

interface ImagePosterProps {
  imageUrl: string;
  alt?: string;
  height?: string;
}

export function ImagePoster({ imageUrl, alt = 'Banner', height = 'h-64' }: ImagePosterProps) {
  return (
    <div className={`w-full ${height} rounded-xl overflow-hidden relative`}>
      <img 
        src={imageUrl} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

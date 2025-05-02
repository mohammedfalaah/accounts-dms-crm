import React from 'react';
import { Image } from 'primereact/image';

function ImageShow({ src, width, height, isRound }) {
  return (
    <Image
      src={src}
      alt="Image"
      width={width}
      height={height}
      preview
      imageStyle={{
        width: {width},
        height: {height}, // Allow height to adjust according to aspect ratio
        objectFit: 'cover', // Ensure image covers the container
        ...(isRound && { borderRadius: '50%' }), // Apply borderRadius if isRound is true
      }}
    />
  );
}

export default ImageShow;

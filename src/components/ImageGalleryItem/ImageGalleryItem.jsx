import React from 'react';
import css from './ImageGalleryItem.module.css';
import { PropTypes } from 'prop-types';

export const ImageGalleryItem = ({ images, onImgClick }) => {
  return (
    <>
      {images.map(image => (
        <li key={image.id} className={css.ImageGalleryItem}>
          <img
            id={image.id}
            onClick={onImgClick}
            className={css.ImageGalleryItemImage}
            src={image.webformatURL}
            alt={image.tags}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onImgClick: PropTypes.func,
};

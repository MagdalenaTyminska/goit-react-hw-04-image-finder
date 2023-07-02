import React, { useEffect } from 'react';
import css from './Modal.module.css';
import { PropTypes } from 'prop-types';

export const Modal = ({ modalImages, onModalClick, onKeyDown }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onKeyDown(event);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div onClick={onModalClick} onKeyDown={onKeyDown} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={modalImages.largeImageURL} alt={modalImages.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalImages: PropTypes.object,
  onModalClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

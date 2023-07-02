import React from 'react';
import css from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <RotatingLines
        strokeColor="#e15b64"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

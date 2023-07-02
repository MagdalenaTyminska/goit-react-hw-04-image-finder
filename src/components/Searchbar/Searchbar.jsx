import React from 'react';
import css from './Searchbar.module.css';
import { PropTypes } from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery1 = form.elements.search.value;
    console.log("I'm inside handleSubmit", searchQuery1);
    form.reset();
    return onSubmit(searchQuery1);
  };

  return (
    <>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.buttonLabel}></span>
          </button>
          <input
            className={css.searchFormInput}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

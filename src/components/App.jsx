import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { fetchImages } from './API/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImages, setModalImages] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async searchQuery => {
    setIsLoading(true);
    const images = await fetchImages(searchQuery);
    setImages(images);
    setSearchQuery(searchQuery);
    setPageNumber(prev => prev + 1);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextImages = await fetchImages(searchQuery, pageNumber);
    setImages(prev => [...prev, ...nextImages]);
    setPageNumber(prev => prev + 1);
    setIsLoading(false);
  };

  const handleModalOpen = event => {
    const modalId = event.currentTarget.id;
    const modalImages = images.find(image => image.id === Number(modalId));
    setIsModalOpen(true);
    setModalImages(modalImages);
  };

  const handleModalClose = event => {
    if (
      event.target.tagName.toLowerCase() !== 'img' ||
      event.key === 'Escape'
    ) {
      setIsModalOpen(false);
      setModalImages(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        setModalImages(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmit={handleSearch}></Searchbar>
        {isModalOpen && (
          <Modal
            modalImages={modalImages}
            onModalClick={handleModalClose}
            onKeyDown={handleModalClose}
          />
        )}
        <ImageGallery>
          <ImageGalleryItem images={images} onImgClick={handleModalOpen} />
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 11 && <Button onClick={handleLoadMore} />}
      </div>
    </>
  );
};

const PIXABAY_API = '33842585-d620847ad659a965fc02b2925';
const PIXABAY_URL = 'https://pixabay.com/api/';

export const fetchImages = async (
  searchQuery,
  pageNumber = 1,
  imagesPerPage = 12
) => {
  console.log("I'm inside fetchImages", searchQuery);
  const url = new URL(PIXABAY_URL);
  const searchParams = {
    key: `${PIXABAY_API}`,
    per_page: imagesPerPage,
    page: pageNumber,
    q: `${searchQuery}`,
  };
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(response.status);
    }
    const images = await response.json();
    return images.hits;
  } catch (error) {
    console.log(error);
  }
};

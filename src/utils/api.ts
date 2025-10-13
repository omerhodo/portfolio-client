// API URL helper functions

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL;
};

export const getBaseUrl = () => {
  return import.meta.env.VITE_BASE_URL;
};

export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  return `${getBaseUrl()}${imagePath}`;
};

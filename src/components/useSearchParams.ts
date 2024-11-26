export const useSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    isViewOnly: searchParams.get('view') === 'only'
  };
};
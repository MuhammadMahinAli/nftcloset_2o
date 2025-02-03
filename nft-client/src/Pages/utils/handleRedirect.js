export const handleRedirect = (path, navigate) => {
  setTimeout(() => {
    navigate(path);
  }, 500);
};

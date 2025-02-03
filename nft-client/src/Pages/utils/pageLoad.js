import {useEffect} from "react";

export const pageLoad = (setShowContent) => {
  useEffect(() => {
    setShowContent(false); // Reset the state
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
};


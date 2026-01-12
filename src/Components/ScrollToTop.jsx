import { useEffect } from "react";
import { useNavigationType, useLocation } from "react-router";

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // POP, PUSH, REPLACE

  useEffect(() => {
   
    if (navigationType === "PUSH" || navigationType === "REPLACE") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);

  return null;
};

export default ScrollToTop;

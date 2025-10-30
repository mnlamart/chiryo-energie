import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Only scroll to top if the pathname actually changed (not just hash)
    if (prevPathnameRef.current !== pathname) {
      // If there's a hash, let the page handle the scroll (e.g., Home page hash scrolling)
      if (!hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
      prevPathnameRef.current = pathname;
    }
  }, [pathname, hash]);

  return null;
}


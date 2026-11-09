import { useEffect, useMemo, useState } from 'react';

export const useMediaQueryResult = (mediaQueryString) => {
  const mediaQueryList = useMemo(() => window.matchMedia(mediaQueryString), [mediaQueryString]);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const handleChange = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [mediaQueryList]);

  return matches;
};

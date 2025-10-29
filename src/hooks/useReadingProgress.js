import { useEffect, useState } from 'react';

const useReadingProgress = (containerRef, enabled = true, dependencyKey = '') => {
  const [progress, setProgress] = useState(0);
  const [folio, setFolio] = useState('');

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      setFolio('');
      return undefined;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollable = docHeight - windowHeight;
      const percentage = totalScrollable > 0 ? (scrollY / totalScrollable) * 100 : 0;
      const clamped = Number.isFinite(percentage) ? Math.min(Math.max(percentage, 0), 100) : 0;
      setProgress(clamped);

      if (containerRef?.current) {
        const pages = containerRef.current.querySelectorAll('#folio');
        let activeFolio = '';
        pages.forEach((page) => {
          const top = page.offsetTop;
          const bottom = top + page.offsetHeight;
          if (scrollY + 150 >= top && scrollY + 150 <= bottom) {
            activeFolio = page.getAttribute('data-name') || '';
          }
        });
        setFolio(activeFolio);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, enabled, dependencyKey]);

  return { progress, folio };
};

export default useReadingProgress;

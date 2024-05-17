import React from 'react';
import { Src } from '../components/Avatar';

export default function useImageLoading(src: string): Src {
  const [loaded, setLoaded] = React.useState<Src>(undefined);

  React.useEffect(() => {
    if (!src) {
      return undefined;
    }
    setLoaded(false);

    const image: HTMLImageElement = new Image();
    image.src = src;

    image.onload = (): void => setLoaded('loaded');

    image.onerror = (): void => setLoaded('error');
  }, [src]);

  return loaded;
}

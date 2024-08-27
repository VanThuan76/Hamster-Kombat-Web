import { useEffect, useState } from "react";

const useImagePreloader = (urls: string[]) => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const preloadImage = (url: string, timeout: number = 300) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        setTimeout(() => reject(new Error("Timeout")), timeout);
      });
    };

    const preloadImages = async () => {
      try {
        await Promise.all(urls.map((url) => preloadImage(url)));
        setIsPreloaded(true);
      } catch (error: any) {
        console.error("Image preloading failed:", error);
        setLoadingError(error.message);
        setIsPreloaded(true); // Set to true even if some images fail to preload
      }
    };

    preloadImages();
  }, [urls]);

  return { isPreloaded, loadingError };
};

export default useImagePreloader;

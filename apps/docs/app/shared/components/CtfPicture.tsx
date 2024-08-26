import { getImageProps } from "next/image";
import { cn } from "@ui/lib/utils";

interface ImageProps extends Omit<any, "__typename"> {
  nextImageProps?: {
    className?: string;
    priority?: boolean;
    loading?: "eager" | "lazy";
  };
}

export const CtfPicture = ({
  url,
  width,
  height,
  title,
  nextImageProps,
}: ImageProps) => {
  if (!url || !width || !height) return null;

  // Common options for different resolutions
  const commonOptions = (w: number, h: number) => ({
    alt: title || "",
    width: w,
    height: h,
    priority: nextImageProps?.priority,
    className: cn(nextImageProps?.className, "transition-all"),
  });

  const {
    props: { srcSet: high },
  } = getImageProps({
    ...commonOptions(width, height),
    src: url,
    priority: nextImageProps?.priority,
  });

  const {
    props: { srcSet: medium },
  } = getImageProps({
    ...commonOptions(800, 500),
    src: url,
    priority: nextImageProps?.priority,
  });

  const {
    props: { srcSet: low, ...rest },
  } = getImageProps({
    ...commonOptions(300, 200),
    src: url,
    priority: nextImageProps?.priority,
  });

  return (
    <picture>
      <source media="(max-width: 740px)" srcSet={low} />
      <source media="(max-width: 980px)" srcSet={medium} />
      <source media="(min-width: 1280px)" srcSet={medium} />
      <source media="(min-width: 1480px)" srcSet={high} />
      <img
        alt={title || ""}
        {...rest}
        loading={nextImageProps?.loading || "lazy"}
        fetchPriority={nextImageProps?.priority ? "high" : "auto"}
      />
    </picture>
  );
};

import { useEffect, useState } from "react";

interface ImageStiProps {
  config: {
    image: {
      name: string;
      alternativeText: string;
      url: string;
      width: number;
      height: number;
    },
    width?: number;
    height?: number;
    clasess?: string;
  };
}

const ImageSti = ({ config: {
  image,
  width,
  height,
  clasess,
} }: ImageStiProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image.url.startsWith("http")) {
      setImageUrl(image.url);
    } else {
      const apiUrl = globalThis.location.origin;
      setImageUrl(apiUrl + image.url);
    }
  }, [image.url]);

  if (!image?.url || !imageUrl) return null;

  return (
    <div className={`w-full text-white ${clasess}`}>
      <img src={imageUrl} alt={image.alternativeText || image.name} width={width || image.width} height={height || image.height} />
    </div>
  );
};

export default ImageSti;

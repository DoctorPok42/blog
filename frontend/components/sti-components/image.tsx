import Image from "next/image";

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
}}: ImageStiProps) => {
  if (!image?.url) return null;

  if (!image.url.startsWith("http")) {
    image.url = "http://localhost:1337" + image.url;
  }

  return (
    <div className={`text-white ${clasess}`}>
      <Image src={image.url} alt={image.alternativeText || image.name} width={width || image.width} height={height || image.height} priority className="rounded-lg" />
    </div>
  );
};

export default ImageSti;

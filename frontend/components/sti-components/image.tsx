import Image from "next/image";

interface ImageStiProps {
  config: {
    image: {
      name: string;
      alternativeText: string;
      url: string;
      width: number;
      height: number;
    }
  };
}

const ImageSti = ({ config: {
    image
}}: ImageStiProps) => {
  if (!image?.url) return null;

  if (!image.url.startsWith("http")) {
    image.url = "http://localhost:1337" + image.url;
  }

  return (
    <div className="text-white w-full flex justify-center my-4">
      <Image src={image.url} alt={image.alternativeText || image.name} width={image.width} height={image.height} priority className="rounded-lg" />
    </div>
  );
};

export default ImageSti;

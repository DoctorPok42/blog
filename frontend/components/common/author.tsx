import { ImagePost } from "../../models/post";
import ImageSti from "../sti-components/image";

interface AuthorProps {
  author: {
    name: string;
    bio: string;
    avatar: ImagePost;
  };
}

const Author = ({ author }: AuthorProps) => {
  return (
    <div className="flex items-center mt-0.5 gap-2 w-full">
      {author.avatar?.url && (
        <ImageSti config={{
          image: author.avatar,
          width: 20,
          height: 20,
          clasess: "rounded-full overflow-hidden"
        }} />
      )}

      <span className="text-sm text-semibold text-gray-400">{author.name}</span>
    </div>
  );
};

export default Author;

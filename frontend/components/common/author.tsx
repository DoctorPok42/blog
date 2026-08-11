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
      {author.avatar?.url ? (
        <ImageSti config={{
          image: author.avatar,
          width: 20,
          height: 20,
          clasess: "rounded-full overflow-hidden"
        }} />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-[26px] h-[26px] rounded-full bg-accent-800 flex items-center justify-center text-[11px] text-accent-100">
            <span>{author.name.split(" ").map((n) => n[0]).join("")}</span>
          </div>
          <span>{author.name}</span>
        </div>
      )}

      <span className="text-sm text-semibold text-neutral-700">{author.name}</span>
    </div>
  );
};

export default Author;

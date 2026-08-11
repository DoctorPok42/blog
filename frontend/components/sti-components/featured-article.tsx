import ImageSti from "./image";
import { Post } from "../../models/post";
import Tag from "../common/tag";
import Button from "../common/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface FeaturedArticleProps {
  config: {
    post: Post;
  }
}

const FeaturedArticle = ({ config: {
  post
} }: FeaturedArticleProps) => {
  if (!post) return null;
  return (
    <div className="mt-10 flex gap-10 items-center justify-start relative">
      <div className="w-[520px] flex flex-col justify-center items-start">
        <Tag
          text="Featured"
          variant="outline"
          divClass="mb-[16px]"
        />

        <h1 className="text-[clamp(28px,4vw,44px)] font-heading font-medium mb-3.5 leading-[1.08] text-white">{post?.title}</h1>
        <p className="max-w-[52ch] text-[16px] mb-[22px] font-medium opacity-80">{post?.excerpt}</p>

        <div className="flex items-center gap-3.5 mb-6 text-[13px] text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-[26px] h-[26px] rounded-full bg-accent-800 flex items-center justify-center text-[11px] text-accent-100">
              <span>{post?.author?.name.split(" ").map((n) => n[0]).join("")}</span>
            </div>
            <span>{post?.author?.name}</span>
          </div>

          <span>·</span>
          <span>{new Date(post?.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          })}</span>
          <span>·</span>
          <span>{post?.minReadTime} min read</span>
        </div>

        <Button
          text="Read the article"
          iconPosition="right"
          icon={faArrowRight}
          onClick={() => window.location.href = `/posts/${post?.slug}`}
        />
      </div>

      <div className="w-[572px] rounded-lg overflow-hidden">
        <ImageSti config={{
          image: post?.cover,
          clasess: "w-full h-full object-cover rounded-[14px] aspect-[4/3] overflow-hidden",
        }} />
      </div>
    </div>
  )
};

export default FeaturedArticle;

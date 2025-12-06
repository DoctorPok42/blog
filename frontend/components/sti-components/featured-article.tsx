import ImageSti from "./image";
import router from "next/router";
import { Post } from "../../models/post";

interface FeaturedArticleProps {
  config: {
    post: Post;
  }
}

const FeaturedArticle = ({ config: {
  post
}}: FeaturedArticleProps) => {
  if (!post) return null;
  return (
    <div className="max-w-[95%] mx-auto py-10 flex items-center justify-start relative">
      <div className="w-[50%] z-100 -mt-4">
        <h1 className="text-yellow-400 uppercase font-bold text-7xl wrap-break-word w-100 leading-15">Featured Article</h1>
        <button
          type="button"
          onClick={() => router.push(`/posts/${post.slug}`)}
          className="w-full text-left bg-gray-50 dark:bg-gray-900 rounded-lg -mt-1 p-3 pt-0.5 cursor-pointer shadow-sm hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-200"
        >
          <p className="mt-4 text-lg">{post?.excerpt}</p>
          <div className="flex justify-end">
            <span className="text-blue-500 cursor-pointer hover:underline inline-block" aria-hidden="true">
              &gt; Read More
            </span>
          </div>
        </button>
      </div>
      <div className="absolute right-0 top-1">
        <ImageSti config={{
          image: post?.cover,
          width: 600
        }} />
      </div>
    </div>
  )
};

export default FeaturedArticle;

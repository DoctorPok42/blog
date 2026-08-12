import { useEffect, useState } from "react";
import { Post } from "../../models/post";
import { GridArticleList, LineByLineArticleList } from "./article-list";

interface LatestPostProps {
  config: {
    number: number;
    type: "Grid" | "List";
  }
}

const LatestPost = ({ config: {
  number, type
} }: LatestPostProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?page=1&pageSize=${number}&sort=createdAt:desc`);
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch latest posts", error);
      }
    };
    fetchPosts();
  }, [number]);

  return (
    <div className="mt-16 flex flex-col relative">
      <div className="mb-[22px]">
        <h2 className="font-heading font-medium text-[32px] m-0">Latest articles</h2>

      </div>
      <div>
        {type === "Grid" && <GridArticleList posts={posts} />}
        {type === "List" && <LineByLineArticleList posts={posts} />}
      </div>
    </div>
  )
};

export default LatestPost;

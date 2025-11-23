import Link from "next/link";
import Headin from "./heading";

enum ArticleListType {
  LINE = "Line-by-line",
  TWO_COLUMN = "Two-by-line",
  GRID = "Grid",
}

interface ArticleListProps {
  config: {
    title: string;
    type: ArticleListType;
    maxItemCol?: number;
  },
  posts?: any;
}

const LineByLineArticleList = ({ posts }: { posts: any }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts?.data?.map((post: any, index: number) => (
        <div key={index} className="p-4 border border-gray-600 rounded">
          <h2 className="text-xl font-bold line-clamp-2" title={post.title}>{post.title}</h2>
          <p className="mt-2 text-gray-500 line-clamp-4" title={post.excerpt}>{post.excerpt}</p>
          <div className="flex justify-end">
            <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline mt-4 inline-block">
              &gt; Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

const TwoByColumnArticleList = ({ posts }: { posts: any }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {posts?.data?.map((post: any, index: number) => (
        <div key={index} className="p-4 border border-gray-600 rounded">
          <h2 className="text-xl font-bold line-clamp-2" title={post.title}>{post.title}</h2>
          <p className="mt-2 text-gray-500 line-clamp-3" title={post.excerpt}>{post.excerpt}</p>
          <div className="flex justify-end">
            <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline mt-4 inline-block">
              &gt; Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

const GridArticleList = ({ posts, maxItemCol }: { posts: any; maxItemCol?: number }) => {
  return (
    <div className={`grid grid-cols-${maxItemCol || 3} gap-4`}>
      {posts?.data?.map((post: any, index: number) => (
        <div key={index} className="p-4 border border-gray-600 rounded">
          <h2 className="text-xl font-bold line-clamp-2" title={post.title}>{post.title}</h2>
          <p className="mt-2 text-gray-500 line-clamp-3" title={post.excerpt}>{post.excerpt}</p>
          <div className="flex justify-end">
            <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline mt-4 inline-block">
              &gt; Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

const ArticleList = ({ config: {
  title, type, maxItemCol
}, posts }: ArticleListProps) => {
  return (
    <div>
      <Headin config={{
        level: 1,
        children: [{ type: "text", text: title }]
      }}
      />

      <div className="mt-6">
        {type === ArticleListType.LINE && <LineByLineArticleList posts={posts} />}
        {type === ArticleListType.TWO_COLUMN && <TwoByColumnArticleList posts={posts} />}
        {type === ArticleListType.GRID && <GridArticleList posts={posts} maxItemCol={maxItemCol} />}
      </div>
    </div>
  );
};

export default ArticleList;

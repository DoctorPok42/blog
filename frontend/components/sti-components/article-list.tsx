import Link from "next/link";
import Headin from "./heading";
import { Post } from "../../models/post";
import Author from "../common/author";

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
  posts: {
    data: Post[];
  }
}

const LineByLineArticleList = ({ posts }: { posts: { data: Post[] } }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts?.data?.map((post: Post, index: number) => (
        <div key={index} className="p-4 border border-gray-600 rounded-lg">
          <div className="flex gap-4">
            {post.categories && post.categories.length > 0 && (
              <div>
                {post.categories.map((category: Post["categories"][0], categoryIndex: number) => (
                  <Link
                    key={categoryIndex}
                    href={`/categories/${category.slug}`}
                  >
                    <span
                      className="text-cyan-600 text-sm font-semibold cursor-pointer hover:underline"
                    >
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {post.author && (
              <div className="w-auto">
                <Author author={post.author} />
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold line-clamp-2" title={post.title}>{post.title}</h2>
          <p className="mt-2 text-gray-500 line-clamp-4" title={post.excerpt}>{post.excerpt}</p>
          <div>
            {post.tags && post.tags.length > 0 && (
              <div className="w-[85%] flex mt-2 gap-2">
                {post.tags.map((tag: Post["tags"][0], tagIndex: number) => (
                  <Link
                    key={tagIndex}
                    href={`/tags/${tag.slug}`}
                  >
                    <span
                      key={tagIndex}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-400 cursor-pointer transition-colors duration-200"
                    >
                      {tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className={`flex justify-end ${post.tags && post.tags.length > 0 ? '-mt-6' : 'mt-2'}`}>
            <Link href={`/posts/${post.slug}`} prefetch={true} className="text-blue-500 hover:underline inline-block">
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
  if (!posts || posts.data.length === 0) return null;

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

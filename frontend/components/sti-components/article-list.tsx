import { Post } from "../../models/post";
import { useEffect, useState } from "react";
import Button from "../common/button";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Tag from "../common/tag";
import Link from "next/link";
import ImageSti from "./image";

export enum ArticleListType {
  LINE = "Line-by-line",
  TWO_COLUMN = "Two-by-line",
  GRID = "Grid",
}

interface ArticleListProps {
  config: {
    title: string;
    type: ArticleListType;
  },
}

export const LineByLineArticleList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="flex flex-col gap-3.5">
      {posts?.map((post: Post, index: number) => (
        <div
          key={index + "-post"}
          className="py-[18px] px-5 border border-divider rounded-md duration-200 cursor-pointer relative"
        >
          <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10" />
          <div className="flex gap-3 items-center justify-between mb-1.5">
            {post.category && (
              <span
                className="text-accent text-[10px] font-light tracking-widest cursor-pointer uppercase"
              >
                {post.category.name}
              </span>
            )}

            <span className="text-[11px] text-neutral-500">
              {post.author.name} · {new Date(post.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })} · {post.minReadTime} min
            </span>
          </div>

          <h3 className="font-heading font-medium text-[19px] mb-1.5 line-clamp-2" title={post.title}>{post.title}</h3>
          <p className="mt-0 opacity-80 text-[13px] line-clamp-3">{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

export const TwoByColumnArticleList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {posts?.map((post: Post, index: number) => (
        <div key={index + "-post"} className="col-span-1">
          <LineByLineArticleList posts={[post]} />
        </div>
      ))}
    </div>
  );
}

export const GridArticleList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className={`grid grid-cols-[repeat(auto-fit,minmax(${posts?.length > 0 ? "220px" : "1fr"},1fr))] gap-4`}>
      {posts?.map((post: Post, index: number) => (
        <div key={index + "-post"} className="w-full flex flex-col border border-divider bg-surface rounded-md cursor-pointer relative">
          <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10" />
          <div className="w-full h-full bg-[#2a2c38] rounded-t-md overflow-hidden">
            <ImageSti config={{
              image: post.cover,
              clasess: "w-full object-cover rounded-t-md aspect-[16/10] overflow-hidden",
            }} />
          </div>
          <div className="p-[18px]">
            <div className="flex gap-3 items-center justify-between">
              {post.category && (
                <span
                  className="text-accent text-[10px] tracking-widest cursor-pointer uppercase"
                >
                  {post.category.name}
                </span>
              )}
            </div>

            <h3 className="font-heading font-medium text-[17px] mt-1.5 mb-2 leading-[1.2] line-clamp-2" title={post.title}>{post.title}</h3>
            <p className="mt-0 opacity-80 text-[13px] line-clamp-3">{post.excerpt}</p>

            <span className="flex justify-between text-[11px] text-neutral-500 mt-3.5">
              {post.author.name} · {new Date(post.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })} <span>{post.minReadTime} min</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const ArticleList = ({ config: {
  title, type } }: ArticleListProps) => {
  const [postsData, setPostsData] = useState<{ data: Post[]; meta: { pagination: { page: number; pageCount: number; total: number } } }>({ data: [], meta: { pagination: { page: 1, pageCount: 1, total: 0 } } });
  const [categories, setCategories] = useState<{ name: string, slug: string }[]>([]);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(12);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPage = async (targetPage: number) => {
    setLoading(true);
    try {
      const postRes = await fetch(`/api/posts?page=${targetPage}&pageSize=12&category=${encodeURIComponent(category)}`);
      const categoryRes = await fetch(`/api/categories`);
      const categoryJson = await categoryRes.json();
      setCategories([{ name: "All", slug: "" }, ...categoryJson.data.map((cat: any) => ({ name: cat.name, slug: cat.slug }))]);
      const json = await postRes.json();
      setPostsData(json);
      setPage(json.meta.pagination.page);
      setPageCount(json.meta.pagination.pageCount);
    } catch (err) {
      console.error("Failed to fetch page", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  useEffect(() => {
    fetchPage(1);
  }, [category]);

  return (
    <div className="w-full pt-8 pb-20 sm:px-4">
      <h1 className="text-[42px] font-medium mb-2.5">{title}</h1>
      {postsData?.data?.length === 0 && !loading && <p className="text-neutral-500 mb-7">No posts available.</p>}
      {postsData?.data?.length > 0 && <p className="text-neutral-500 mb-7">{postsData?.meta?.pagination.total} post{postsData?.meta?.pagination.total !== 1 ? "s" : ""}{category && ` — ${categories.find((e) => e.slug === category)?.name}`}</p>}

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-7">
          {categories.map((cat: { name: string, slug: string }) => (
            <button
              type="button"
              key={cat.slug}
              className="cursor-pointer"
              onClick={() => {
                setCategory(cat.slug);
                setPage(1);
              }}
            >
              <Tag
                text={cat.name}
                variant={cat.slug === category ? "accent" : "neutral"}
              />
            </button>
          ))}
        </div>
      )}

      {type === ArticleListType.LINE && <LineByLineArticleList posts={postsData?.data} />}
      {type === ArticleListType.TWO_COLUMN && <TwoByColumnArticleList posts={postsData?.data} />}
      {type === ArticleListType.GRID && <GridArticleList posts={postsData?.data} />}

      {pageCount > 1 && !loading && <div className="flex justify-center mt- gap-4">
        <Button
          text="Previous"
          onClick={() => fetchPage(page - 1)}
          disabled={page <= 1 || loading}
          icon={faArrowAltCircleLeft}
        />

        <span className="text-sm self-center">{page} / {pageCount}</span>
        <Button
          onClick={() => fetchPage(page + 1)}
          disabled={page >= pageCount || loading}
          text="Next"
          icon={faArrowAltCircleRight}
          iconPosition="right"
        />
      </div>}
    </div>
  );
};

export default ArticleList;

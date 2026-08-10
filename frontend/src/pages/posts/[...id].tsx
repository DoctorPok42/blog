import { NextPageContext } from "next";
import { postService } from "../../../services/post.service";
import { StiComponentRenderer } from "../../../components/sti-component-renderer";
import ImageSti from "../../../components/sti-components/image";
import Link from "next/link";
import { Post } from "../../../models/post";
import { GridArticleList } from "../../../components/sti-components/article-list";
import { useEffect, useState } from "react";
import Button from "../../../components/common/button";

const extractText = (node: any): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.children) return extractText(node.children);
  if (node?.config?.children) return extractText(node.config.children);
  return "";
};

const textToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
};

const extractHeadings = (content: any[]): Array<{ text: string; id: string }> => {
  return content
    .filter((item) => item.type === "heading" && item.level === 2)
    .map((item) => {
      const text = extractText(item.children[0].text);
      return { text, id: textToSlug(text) };
    });
};

const addIdsToContent = (content: any[]): any[] => {
  const headingCount = new Map<string, number>();

  return content.map((item) => {
    if (item.type === "heading" && item.level === 2) {
      const text = extractText(item.children[0].text);
      const slug = textToSlug(text);
      const count = (headingCount.get(slug) || 0) + 1;
      headingCount.set(slug, count);

      const id = count > 1 ? `${slug}-${count}` : slug;

      return {
        ...item,
        id,
      };
    }
    return item;
  });
};

const PostId = ({ post }: { post: Post }) => {
  const [headings, setHeadings] = useState<Array<{ text: string; id: string }>>([]);

  useEffect(() => {
    if (post?.content) {
      const extractedHeadings = extractHeadings(post.content);
      setHeadings(extractedHeadings);
    }
  }, [post]);

  const contentWithIds = post?.content ? addIdsToContent(post.content) : [];

  if (!post) {
    return (
      <div className="flex items-center justify-center">
        <main className="flex w-full max-w-[560px] mx-auto flex-col items-center justify-center pt-[120px] pb-[140px] px-6 sm:items-start">
          <div className="w-full font-heading text-[15px] text-accent tracking-[0.08em] font-light mb-3.5 uppercase text-center">error 404</div>
          <h1 className="w-full text-center font-heading font-semibold text-[clamp(26px,4vw,34px)] mb-3.5">This page doesn't exist (yet)</h1>
          <p className="w-full text-center text-neutral-500 mb-7">The content you're looking for may have moved or been renamed.</p>

          <div className="w-full flex gap-2.5 justify-center flex-wrap">
            <Button
              text="Go to home"
              onClick={() => window.location.href = "/"}
            />
            <Button
              text="Start a search"
              onClick={() => window.location.href = "/search"}
              variant="secondary"
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center">
      <div className="max-w-250 ml-80 pb-12 px-8 min-h-screen">
        <span className="text-cyan-700 text-sm font-semibold cursor-pointer hover:underline mb-2 inline-block"><Link href="/">Go back</Link></span>
        <h1 className="text-5xl font-bold">{post.title}</h1>

        <div className="flex gap-4 mt-2 mb-4">
          <span className="text-gray-500 dark:text-gray-400">{new Date(post.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
          })}</span>
          <span className="text-gray-500 dark:text-gray-400 border-dashed border-b-2">{post.minReadTime} minute{post.minReadTime === 1 ? '' : 's'} read</span>
        </div>

        <div className="w-full flex justify-center mb-8">
          <ImageSti config={{
            image: post.cover
          }} />
        </div>

        {contentWithIds.map((child: { type: string }, index: number) => (
          <StiComponentRenderer key={index + "-content"} type={child.type} config={child} />
        ))}

        {post.category && (
          <div className="w-full flex justify-between mt-10 mb-2">
            <div className="max-w-[30%] flex gap-2">
              <Link
                href={`/categories/${post.category.slug}`}
              >
                <span
                  className="text-cyan-600 text-2sm font-semibold cursor-pointer hover:underline"
                  title={post.category.name}
                >
                  {post.category.name}
                </span>
              </Link>
            </div>
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex mb-2 gap-2">
            {post.tags.map((tag: Post["tags"][0], tagIndex: number) => (
              <Link key={tagIndex + "-tag"} href={`/tags/${tag.slug}`}>
                <span
                  className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-300 cursor-pointer transition-colors duration-200"
                >
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {post.relatedPosts?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
            <GridArticleList posts={post.relatedPosts} maxItemCol={2} />
          </div>
        )}
      </div>

      <div className="sticky top-35 ml-5 hidden lg:block w-75 h-fit border-l border-gray-300 dark:border-gray-600 pl-5">
        <span className="text-gray-500 dark:text-gray-400 text-[16px] font-semibold block mb-3">On this page</span>
        {headings.length > 0 ? (
          <nav className="space-y-2">
            {headings.map((heading, index) => (
              <a
                key={index + "-heading-link"}
                href={`#${heading.id}`}
                className="w-fit block text-gray-600 dark:text-gray-400 text-sm hover:underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 truncate"
                title={heading.text}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-xs">No headings found</p>
        )}
      </div>
    </div>
  );
}

export default PostId;

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;

  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const post = await postService.getPostBySlug(id[0]);

  return {
    props: { post: post.data[0] || null }
  };
}

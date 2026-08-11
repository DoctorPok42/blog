import { NextPageContext } from "next";
import { postService } from "../../../services/post.service";
import { StiComponentRenderer } from "../../../components/sti-component-renderer";
import ImageSti from "../../../components/sti-components/image";
import Link from "next/link";
import { Post } from "../../../models/post";
import { GridArticleList } from "../../../components/sti-components/article-list";
import { useEffect, useState } from "react";
import Button from "../../../components/common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Tag from "../../../components/common/tag";
import Author from "../../../components/common/author";

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
      const text = extractText(item.children[0].text).replaceAll(/[?!.:]/g, "").trim();
      return { text, id: textToSlug(text) };
    });
};

const addIdsToContent = (content: any[]): any[] => {
  const headingCount = new Map<string, number>();

  return content.map((item) => {
    if (item.type === "heading" && item.level === 2) {
      const text = extractText(item.children[0].text)
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
  const [headingSelected, setHeadingSelected] = useState<string | null>(null);

  useEffect(() => {
    if (post?.content) {
      const extractedHeadings = extractHeadings(post.content);
      setHeadings(extractedHeadings);
    }
  }, [post]);

  useEffect(() => {
    if (!headingSelected) {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setHeadingSelected(hash);
      }
    }
  }, [headingSelected]);

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
    <div className="max-w-[1180px] mx-auto px-6 pt-8 pb-20 relative flex justify-center gap-12">
      <div className="pb-12 min-h-screen">
        <Tag
          text={post.category.name}
          divClass="inline-flex mb-[14px]"
        />

        <h1 className="text-5xl font-medium mb-4">{post.title}</h1>

        <div className="flex items-center justify-between gap-3.5 pb-6 mb-7 border-b border-divider">
          <div className="flex gap-2.5 items-center">
            <div className="w-[34px] h-[34px] rounded-full bg-accent-800 flex items-center justify-center text-[13px] text-accent-100">
              <span>{post.author.name.split(" ").map((n) => n[0]).join("")}</span>
            </div>

            <div>
              <span className="text-[#E9E9ED] font-medium text-[14px]">{post.author.name}</span>

              <div className="flex gap-1 text-[12px] text-neutral-500">
                <span>{new Date(post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit"
                })}</span>
                <span>·</span>
                <span>{post.minReadTime} min read</span>
              </div>
            </div>
          </div>

          <div className="flex gap-1.5">
            {post.tags.map((tag: Post["tags"][0], tagIndex: number) => (
              <Tag
                key={tagIndex + "-tag"}
                text={tag.name}
                variant="outline"
              />
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center mb-8">
          <ImageSti config={{
            image: post.cover,
            clasess: "w-full object-cover rounded-lg aspect-[16/8] overflow-hidden",
          }} />
        </div>

        {contentWithIds.map((child: { type: string }, index: number) => (
          <StiComponentRenderer key={index + "-content"} type={child.type} config={child} />
        ))}

        {post.relatedPosts?.length > 0 && (
          <div className="mt-14">
            <h2 className="text-[32px] font-medium mb-5">Related articles</h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
              {post.relatedPosts?.map((relatedPost: Post["relatedPosts"][0], index: number) => (
                <div key={index + "-related-post"} className="relative flex flex-col gap-0.5 bg-surface border border-divider rounded-md p-4 mb-4 cursor-pointer">
                  <Link href={`/posts/${relatedPost.slug}`} className="absolute inset-0 z-10" />
                  {relatedPost.category && <div className="text-accent text-[10px] font-light tracking-widest cursor-pointer uppercase">
                    {relatedPost.category.name}
                  </div>}

                  <h3 className="font-heading font-medium text-[15px] mt-1.5 line-clamp-2" title={relatedPost.title}>
                    {relatedPost.title}
                  </h3>

                  {relatedPost.minReadTime && <div className="text-[11px] text-neutral-500">
                    {relatedPost.minReadTime} min
                  </div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {headings.length > 0 && <div className="sticky top-5 mt-[70px] hidden lg:block h-fit">
        <span className="flex gap-1.5 items-center text-neutral-500 text-[11px] uppercase font-semibold mb-3 tracking-[0.08em]">
          <FontAwesomeIcon icon={faBarsStaggered} className="-ml-0.5" />
          Contents
        </span>
        <nav className="flex flex-col gap-2.5 border-l border-divider pl-3.5">
          {headings.map((heading, index) => (
            <a
              key={index + "-heading-link"}
              href={`#${heading.id}`}
              className={`w-fit block text-neutral-500 dark:text-gray-400 text-[13px] hover:underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 truncate ${headingSelected === heading.id ? "text-accent!" : ""}`}
              title={heading.text}
              onClick={() => setHeadingSelected(heading.id)}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>}
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

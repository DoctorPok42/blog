import { NextPageContext } from "next";
import { postService } from "../../../services/post.service";
import { StiComponentRenderer } from "../../../components/sti-component-renderer";
import ImageSti from "../../../components/sti-components/image";
import Link from "next/link";
import { Post } from "../../../models/post";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faArrowRotateLeft, faBarsStaggered, faClose, faGauge, faGaugeSimple, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import Tag from "../../../components/common/tag";
import Head from "next/head";
import BreadCrumb from "../../../components/common/breadcrumb";

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

interface SpeedReader {
  play: boolean,
  speed: "250" | "350" | "500" | "700",
  progress: number,
}

function SpeedReaderWord({ word }: Readonly<{ word: string }>) {
  if (!word) return null;

  const midIndex = Math.floor((word.length - 1) / 2);
  const left = word.slice(0, midIndex);
  const middle = word.charAt(midIndex);
  const right = word.slice(midIndex + 1);

  return (
    <div className="flex items-center w-full text-[clamp(24px,5vw,38px)] font-mono tracking-tight text-center">
      <span className="flex-1 text-right whitespace-pre">{left}</span>
      <span className="text-accent">{middle}</span>
      <span className="flex-1 text-left whitespace-pre">{right}</span>
    </div>
  );
}

const PostId = ({ post }: { post: Post }) => {
  const [headings, setHeadings] = useState<Array<{ text: string; id: string }>>([]);
  const [headingSelected, setHeadingSelected] = useState<string | null>(null);
  const [speedReaderActive, setSpeedReaderActive] = useState<boolean>(false);
  const [speedReader, setSpeedReader] = useState<SpeedReader>({
    play: true,
    speed: "350",
    progress: 0
  });
  const childrenTypeAccepted = new Set(["paragraph"])
  const speedReaderRef = useRef<HTMLDivElement>(null);

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
  let content = contentWithIds.filter((child: { type: string }) => childrenTypeAccepted.has(child.type)).map((child: { type: string, children: any[] }, index) => {
    if (child.type === "paragraph") {
      return child.children.map((c: any) => {
        if (c.type === "text") {
          return c.text;
        } else if (c.type === "link") {
          return c.children.map((cc: any) => {
            if (cc.type === "text") {
              return cc.text;
            }
            return "";
          }).join("");
        }
        return "";
      }).join(" ");
    }
  }).join(" ").trim();

  const words = content.split(" ").length;
  const interval = 60000 / Number.parseInt(speedReader.speed);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!speedReaderActive) return;

      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        setSpeedReader((prev) => ({ ...prev, play: !prev.play, progress: prev.progress === words - 1 ? 0 : prev.progress }));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSpeedReader((prev) => ({ ...prev, progress: Math.min(prev.progress + 10, words - 1) }));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSpeedReader((prev) => ({ ...prev, progress: Math.max(prev.progress - 10, 0) }));
      } else if (event.key === "Escape") {
        event.preventDefault();
        setSpeedReaderActive(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [speedReaderActive, words]);

  const startSpeedReader = () => {
    setSpeedReader({ play: false, speed: speedReader.speed, progress: 0 });
    setSpeedReaderActive(true);
    setTimeout(() => {
      setSpeedReader((prev) => ({ ...prev, play: true }));
    }, 500);
  }

  useEffect(() => {
    if (!speedReaderActive || !speedReader.play) return;

    const timer = setInterval(() => {
      setSpeedReader((prev) => {
        if (prev.progress < words - 1) {
          return { ...prev, progress: prev.progress + 1 };
        }
        clearInterval(timer);
        return { ...prev, play: false };
      });
    }, interval);

    return () => clearInterval(timer);
  }, [speedReaderActive, speedReader.play, speedReader.speed, words]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speedReaderRef.current && !speedReaderRef.current.contains(event.target as Node)) {
        setSpeedReaderActive(false);
      }
    };

    if (speedReaderActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [speedReaderActive]);

  if (!post) {
    return (
      <>
        <Head>
          <title>Page not found — My blog</title>
          <meta name="description" content="This page doesn't exist or has moved. Head back home or start a search on My blog." />
          <meta property="og:title" content="Page not found — My blog" />
          <meta property="og:description" content="This page doesn't exist or has moved. Head back home or start a search on My blog." />
          <meta property="og:image" content="https://blog.doctorpok.io/icon0.svg" />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Page not found — My blog" />
          <meta name="twitter:description" content="This page doesn't exist or has moved. Head back home or start a search on My blog." />
          <meta name="twitter:image" content="https://blog.doctorpok.io/icon0.svg" />
        </Head>

        <div className="flex items-center justify-center">
          <main className="flex w-full max-w-[560px] mx-auto flex-col items-center justify-center pt-[120px] pb-[140px] px-6 sm:items-start">
            <div className="w-full font-heading text-[15px] text-accent tracking-[0.08em] font-light mb-3.5 uppercase text-center">error 404</div>
            <h1 className="w-full text-center font-heading font-semibold text-[clamp(26px,4vw,34px)]! mb-3.5">This page doesn't exist (yet)</h1>
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
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt.slice(0, 155) + "..."} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt.slice(0, 155) + "..."} />
        <meta property="og:image" content={post.cover?.url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt.slice(0, 155) + "..."} />
        <meta name="twitter:image" content={post.cover?.url} />
      </Head>

      {(speedReaderActive && speedReader) && (
        <div className="fixed overflow-y-hidden top-0 left-0 w-full min-h-screen max-h-screen bg-black/50 flex justify-center items-center z-1">
          <div ref={speedReaderRef} className="w-170 border border-divider rounded-2xl bg-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2 items-center text-accent">
                <svg data-dc-tpl="141" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path data-dc-tpl="142" d="M4 18a9 9 0 1 1 16 0"></path><path data-dc-tpl="143" d="M12 13.5 16 9"></path></svg>
                <span className="uppercase tracking-wider text-[11px]">Speed Reader</span>
              </div>

              <div className="flex items-center justify-center text-[12px] text-neutral-500 gap-2">
                <span>{post.title}</span>

                <Button
                  icon={faClose}
                  onClick={() => setSpeedReaderActive(false)}
                  variant="secondary"
                  divClass="px-2! py-2! text-text text-[11.5px]!"
                />
              </div>
            </div>

            <div className="w-full mb-2 py-8 flex flex-col gap-2 border-t border-b border-divider relative select-none">
              <span className="absolute top-0 left-[50%] h-[9px] w-px bg-accent"></span>
              <div className="flex flex-col items-center justify-center">
                <SpeedReaderWord word={content.split(" ")[speedReader.progress || 0]} />

                <span className="text-neutral-500 mt-1 tracking-widest text-[12px]">{content.split(" ").slice(speedReader.progress + 1, (speedReader.progress || 0) + 5).join(" ")}</span>
              </div>
              <span className="absolute bottom-0 left-[50%] h-[9px] w-px bg-accent"></span>
            </div>

            <div className="w-full flex gap-2 mb-4 relative">
              <div className="w-full h-[3px] bg-neutral-800 rounded-full">
                <div className={`flex flex-1 h-full bg-accent ${speedReader.progress === words - 1 ? 'rounded-full' : 'rounded-l-full'}`} style={{
                  width: `${(speedReader.progress / (words - 1)) * 100}%`,
                  transition: "width 0.1s ease-in-out"
                }}></div>
              </div>
            </div>

            <div className=" w-full flex justify-between pb-4 mb-3 border-b border-divider">
              <div className="flex gap-2 select-none">
                <Button
                  icon={faArrowRotateLeft}
                  onClick={() => setSpeedReader({ ...speedReader, progress: 0 })}
                  divClass="text-[11px]! h-10! px-3"
                  variant="secondary"
                />
                <Button
                  icon={faAnglesLeft}
                  onClick={() => setSpeedReader({ ...speedReader, progress: Math.max(0, speedReader.progress - 10) })}
                  divClass="text-[11px]! px-3"
                  variant="secondary"
                  disabled={speedReader.progress <= 0}
                />
                <Button
                  text={speedReader.play ? "Pause" : speedReader.progress === words - 1 ? "Replay" : "Resume"}
                  onClick={() => setSpeedReader({ ...speedReader, play: !speedReader.play, progress: speedReader.progress === words - 1 ? 0 : speedReader.progress })}
                  divClass="text-[12px]! px-6"
                  icon={
                    speedReader.play ? faPause : speedReader.progress === words - 1 ? faArrowRotateLeft : faPlay
                  }
                />
                <Button
                  icon={faAnglesRight}
                  onClick={() => setSpeedReader({ ...speedReader, progress: Math.min(speedReader.progress + 10, words - 1) })}
                  divClass="text-[11px]! px-3"
                  variant="secondary"
                  disabled={speedReader.progress >= words - 1}
                />
              </div>
              <div className="flex gap-2 items-center select-none">
                <span className="text-[12px] text-neutral-500">WPM</span>
                {
                  ["250", "350", "500", "700"].map((speed) => (
                    <Button
                      key={speed}
                      text={speed}
                      divClass="text-[11px]!"
                      onClick={() => setSpeedReader({ ...speedReader, speed: speed as SpeedReader["speed"] })}
                      variant={speed === speedReader.speed ? "primary" : "secondary"}
                    />
                  ))
                }
              </div>
            </div>

            <div className="flex justify-between items-center text-[12px] text-neutral-500">
              <div className="flex flex-1">
                Word {speedReader.progress + 1} of {content.split(" ").length}
              </div>

              <div className="flex flex-2 justify-center">
                {Math.ceil(((content.split(" ").length - speedReader.progress - 1) * 6000) / Number.parseInt(speedReader.speed)) * 0.001 < 1 ? "< 1 minute" : `${(Math.ceil(((content.split(" ").length - speedReader.progress - 1) * 6000) / Number.parseInt(speedReader.speed)) * 0.001).toFixed(0)} minute${(Math.ceil(((content.split(" ").length - speedReader.progress - 1) * 6000) / Number.parseInt(speedReader.speed)) * 0.001).toFixed(0) !== "1" ? "s" : ""}`} left at {speedReader.speed} wpm
              </div>

              <div className="flex flex-2 justify-end">
                <span>
                  Space pause · ← → skip · Esc close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-[1180px] mx-auto px-6 pt-8 pb-20 relative flex justify-center gap-12 ${speedReaderActive && 'blur-xs'} transition duration-150`}>
        <div className="w-full pb-12 min-h-screen">
          <BreadCrumb
            items={[
              { label: post.category.name, href: `/categories?slug=${post.category.slug}` },
              { label: post.title },
            ]}
          />

          <Tag
            text={post.category.name}
            divClass="inline-flex mb-[14px]"
          />

          <h1 className="text-[clamp(28px,4vw,40px)]! font-medium mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center justify-between gap-3.5 pb-6 mb-7 border-b border-divider">
            <div className="flex gap-2.5 items-center">
              <div className="w-[34px] h-[34px] rounded-full bg-accent-800 flex items-center justify-center text-[13px] text-accent-100">
                <span>{post.author.name.split(" ").map((n) => n[0]).join("")}</span>
              </div>

              <div>
                <span className="text-text font-medium text-[14px]">{post.author.name}</span>

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

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag: Post["tags"][0], tagIndex: number) => (
                <Tag
                  key={tagIndex + "-tag"}
                  text={tag.name}
                  variant="outline"
                />
              ))}

              <Button
                text={`Speed read ${speedReader.speed} wpm`}
                onClick={startSpeedReader}
                divClass="text-[11px]! ml-2"
                svg={
                  <svg data-dc-tpl="141" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path data-dc-tpl="142" d="M4 18a9 9 0 1 1 16 0"></path><path data-dc-tpl="143" d="M12 13.5 16 9"></path></svg>
                }
              />
            </div>
          </div>

          <div className="w-full flex justify-center mb-8">
            <ImageSti config={{
              image: post.cover,
              clasess: "w-full object-cover rounded-lg aspect-[16/8] overflow-hidden",
            }} />
          </div>

          <div className="wrap-break-word">
            <article>
              {contentWithIds.map((child: { type: string }, index: number) => (
                <StiComponentRenderer key={index + "-content"} type={child.type} config={child} />
              ))}
            </article>
          </div>

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
                className={`w-fit block text-neutral-500 text-[13px] hover:underline hover:text-accent-2 transition-colors duration-200 truncate ${headingSelected === heading.id ? "text-accent!" : ""}`}
                title={heading.text}
                onClick={() => setHeadingSelected(heading.id)}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>}
      </div>
    </>
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

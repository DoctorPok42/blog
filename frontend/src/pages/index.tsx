import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { StiComponentRenderer } from "../../components/sti-component-renderer";
import { postService } from "../../services/post.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface HomeProps {
  home: any;
  posts: any;
}

export default function Home({ home, posts }: Readonly<HomeProps>) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-gray-800 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center gap-20 py-32 px-16 bg-white dark:bg-gray-800 sm:items-start">
        <div className="w-full space-y-16">
          {home.content.map((component: { __component: string }, index: number) => (
            <StiComponentRenderer key={index} type={component.__component} config={component} posts={posts} />
          ))}
        </div>
      </main>
    </div>
  );
}


export async function getServerSideProps() {
  const API_URL = process.env.API_URL || "http://localhost:1337";
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const getHomePage = async () => {
    const populate = [
      "populate[content][on][collection.featured-article][populate]=*",
      "populate[content][on][collection.article-list][populate]=*",
      "pagination[pageSize]=1",
    ].join("&");

    const res = await fetch(`${API_URL}/api/homes?${populate}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });
    const data = await res.json();
    return data;
  }

  const homePageData = await getHomePage().then(data => data.data[0]);
  const postsData = await postService.getPosts();

  return {
    props: { home: homePageData, posts: postsData },
  }
}

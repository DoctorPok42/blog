import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface HomeProps {
  posts: any;
}

export default function Home({ posts }: Readonly<HomeProps>) {

  console.log("Fetched posts:", posts);
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-gray-800 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center gap-20 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the index.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Posts from Strapi:</h2>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300">
            {posts.data.map((post: any) => (
              <li key={post.slug} className="mb-2">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                {/* <p>{post.content}</p> */}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}


export async function getServerSideProps() {
  const getPosts = async () => {
    const res = await fetch("http://localhost:1337/api/posts?populate=*", {
      cache: "no-store",
    });
    const posts = await res.json();
    return posts;
  };

  const posts = await getPosts();

  return {
    props: { posts },
  }
}
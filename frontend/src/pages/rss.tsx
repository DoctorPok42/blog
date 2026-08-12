import { NextApiResponse } from "next";
import { Feed } from "feed";
import { dataService } from "../../services/data.service";
import { Post } from "../../models/post";

const generateRssFeed = async (posts: Post[]) => {
  const feed = new Feed({
    title: "My Blog",
    description: "This is the RSS feed for my blog.",
    id: "https://blog.doctorpok.io",
    link: "https://blog.doctorpok.io",
    language: "en",
    image: "https://blog.doctorpok.io/icon0.svg",
    favicon: "https://blog.doctorpok.io/favicon.ico",
    author: {
      name: "DoctorPok",
      link: "https://doctorpok.io",
      avatar: "https://doctorpok.io/favicon.ico",
    },
    copyright: "© 2026 DoctorPok. All rights reserved.",
  });

  posts?.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `https://blog.doctorpok.io/posts/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.updatedAt),
      author: [{
        name: post.author.name,
      }],
      category: post.category ? [{ name: post.category.name }] : undefined,
      copyright: "© 2026 DoctorPok. All rights reserved.",
      guid: `https://blog.doctorpok.io/posts/${post.slug}`,
      image: post.cover?.url ? `https://blog.doctorpok.io${post.cover.url}` : undefined,
      contributor: post.author ? [{ name: post.author.name }] : undefined,
    });
  });

  return feed.rss2();
};

const Rss = () => { };

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const posts = await dataService.getPosts();
  console.log("Fetched posts for RSS feed:", posts.length);

  const rss = await generateRssFeed(posts.data);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: {} };
}

export default Rss

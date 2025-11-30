import { NextPageContext } from "next";
import { postService } from "../../../services/post.service";
import { StiComponentRenderer } from "../../../components/sti-component-renderer";
import ImageSti from "../../../components/sti-components/image";
import Link from "next/link";

const Post = ({ post }: { post: any }) => {
  if (!post) {
    return <div className="text-white">Post not found</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans dark:bg-black">
      <div className="max-w-5xl mx-auto py-16 px-8 bg-white dark:bg-gray-800 min-h-screen">
        <div className="w-full mb-8">
          <ImageSti config={{
            image: post.cover
          }} />
        </div>
        {post.categories && post.categories.length > 0 && (
          <div className="w-[85%] flex gap-2">
            {post.categories.map((category: string, categoryIndex: number) => (
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
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        {post.tags && post.tags.length > 0 && (
          <div className="w-full flex mb-2 gap-2">
            {post.tags.map((tag: string, tagIndex: number) => (
              <Link key={tagIndex} href={`/tags/${tag.slug}`}>
                <span
                  className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-300 cursor-pointer transition-colors duration-200"
                >
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
        )}
        {post.content.map((child: { type: string }, index: number

        ) => (
          <StiComponentRenderer key={index} type={child.type} config={child} />
        ))}
      </div>
    </div>
  );
}

export default Post;

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

  if (!post || post.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: post.data[0] || null }
  };
}

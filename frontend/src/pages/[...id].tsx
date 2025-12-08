import Link from "next/link";
import { StiComponentRenderer } from "../../components/sti-component-renderer";

interface IdProps {
  data: any;
}

const Id = ({ data }: IdProps) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center bg-gray-800 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-6xl mx-auto flex-col items-center justify-center gap-5 py-12 px-16 bg-white dark:bg-gray-800 sm:items-start">
          <h1 className="text-4xl font-bold text-white text-center w-full">404 - Page Not Found</h1>
          <span className="text-lg text-gray-300 text-center w-full">The page you are looking for does not exist.</span>
          <Link href="/" className="text-blue-500 hover:underline text-center w-full">
            &gt; Go back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-gray-800 font-sans dark:bg-black`}>
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center gap-20 py-12 px-16 bg-white dark:bg-gray-800 sm:items-start">
        <div className="w-full space-y-16">
          {data?.content.map((component: { __component: string }, index: number) => (
            <StiComponentRenderer key={index} type={component.__component} config={component} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Id

export const getServerSideProps = async (context: { params: { id: string[] } }) => {
  const { id } = context.params;
  const API_URL = process.env.API_URL || "http://localhost:1337";
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const populate = [
      "populate[content][on][collection.article-list][populate]=*",
      "populate[content][on][collection.search-bar]=*",
      "pagination[pageSize]=1",
    ].join("&");

  const fetchData = await fetch(`${API_URL}/api/pages?filters[slug]=${id}&${populate}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  const data = await fetchData.json();

  return {
    props: {
      data: data?.data[0] || null,
    },
  };
};

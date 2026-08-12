import { StiComponentRenderer } from "../../components/sti-component-renderer";
import Button from "../../components/common/button";
import Head from "next/head";

interface IdProps {
  data: any;
}

const Id = ({ data }: IdProps) => {
  if (!data) {
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
            <h1 className="w-full text-center font-heading font-bold text-[clamp(26px,4vw,34px)]! mb-3.5">This page doesn't exist (yet)</h1>
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
        <title>{data.titleSeo}</title>
        <meta name="description" content={data.description} />
        <meta property="og:title" content={data.titleSeo} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content="https://blog.doctorpok.io/icon0.svg" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.titleSeo} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content="https://blog.doctorpok.io/icon0.svg" />
      </Head>

      <div className={`flex items-center justify-center`}>
        <main className="flex w-full max-w-6xl flex-col items-center gap-20 sm:items-start">
          <div className="w-full space-y-16">
            {data?.content.map((component: { __component: string }, index: number) => (
              <StiComponentRenderer key={index + component.__component} type={component.__component} config={component} />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default Id

export const getServerSideProps = async (context: { params: { id: string[] } }) => {
  const { id } = context.params;
  const API_URL = process.env.API_URL || "http://strapi:1337";
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const populate = [
    "populate[content][on][collection.article-list][populate]=*",
    "populate[content][on][collection.search-bar]=*",
    "populate[content][on][collection.category-list]=*",
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

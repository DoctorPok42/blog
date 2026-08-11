import { StiComponentRenderer } from "../../components/sti-component-renderer";

interface HomeProps {
  home: any;
}

export default function Home({ home }: Readonly<HomeProps>) {
  return (
    <div
      className={`flex items-center justify-center`}
    >
      <main className="flex w-full max-w-[1180px] flex-col items-center gap-20 px-6 pb-20 sm:items-start">
        <div className="w-full">
          {home.content.map((component: { __component: string }, index: number) => (
            <StiComponentRenderer key={index + "-component"} type={component.__component} config={component} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const API_URL = process.env.API_URL || "http://strapi:1337";
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const getHomePage = async () => {
    const populate = [
      "populate[content][on][collection.featured-article][populate][post][populate]=*",
      "populate[content][on][collection.article-list][populate]=*",
      "populate[content][on][collection.search-bar]=*",
      "populate[content][on][collection.latest-articles][populate]=*",
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

  return {
    props: { home: homePageData },
  }
}

"use server";

export interface HeaderData {
  nav: Array<{
    label: string;
    link: string;
    slug: string;
  }>;
}

class DataService {
  private readonly API_URL = process.env.API_URL || "http://localhost:1337";
  private readonly STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  async getHeaderData(): Promise<HeaderData> {
    console.log("Fetching header data...");
    const populate = ["populate=logo", "populate[navigation][populate]=*"].join(
      "&"
    );

    // const resLogo = await fetch(`${this.API_URL}/api/header?${populate}`, {
    //   headers: {
    //     Authorization: `Bearer ${this.STRAPI_API_TOKEN}`,
    //   },
    //   next: { revalidate: 600 },
    // });
    // const data = await res.json();

    const resNav = await fetch(
      `${this.API_URL}/api/navigation/render/navigation`,
      {
        headers: {
          Authorization: `Bearer ${this.STRAPI_API_TOKEN}`,
        },
        next: { revalidate: 600 },
      }
    );

    if (!resNav.ok) throw new Error("Failed to fetch header data");

    let data = {
      nav: await resNav.json(),
    };

    data.nav = data.nav.map((item: any) => ({
      label: item.title,
      link: "/" + item.path,
    }));

    data.nav.unshift({ label: "Home", link: "/" });

    return data;
  }
}

export const dataService = new DataService();

"use server";

export interface HeaderData {
  nav: Array<{
    label: string;
    link: string;
    slug: string;
  }>;
}

class DataService {
  private readonly API_URL = process.env.API_URL || "http://strapi:1337";
  private readonly STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  async getHeaderData(): Promise<HeaderData> {

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

    return data;
  }

  async getPosts(
    pageSize: number = 12,
    page: number = 1,
    category?: string
  ): Promise<any> {
    let url = `${this.API_URL}/api/posts?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;
    if (category) {
      url += `&filters[category][slug][$eq]=${category}`;
    }

    const resPosts = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 600 },
    });

    if (!resPosts.ok) {
      console.error("Failed to fetch posts:", resPosts.status, resPosts.statusText);
      throw new Error("Failed to fetch posts");
    }

    return await resPosts.json();
  }

  async getCategories(): Promise<any> {
    const resCategories = await fetch(`${this.API_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${this.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 600 },
    });

    if (!resCategories.ok) {
      console.error("Failed to fetch categories:", resCategories.status, resCategories.statusText);
      throw new Error("Failed to fetch categories");
    }

    return await resCategories.json();
  }
}

export const dataService = new DataService();

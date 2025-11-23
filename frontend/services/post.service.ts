class PostService {
  private readonly API_URL = process.env.API_URL || "http://localhost:1337";
  private readonly STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  async getPosts() {
    const res = await fetch(`${this.API_URL}/api/posts?populate=*`, {
      headers: {
        Authorization: `Bearer ${this.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();
    return data;
  }

  async getPostBySlug(slug: string) {
    const res = await fetch(
      `${this.API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${this.STRAPI_API_TOKEN}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch post");

    const data = await res.json();
    return data;
  }
}

export const postService = new PostService();

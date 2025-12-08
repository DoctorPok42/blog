import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

class MeilisearchService {
  private static readonly MEILISEARCH_HOST =
    process.env.MEILISEARCH_HOST || "http://localhost:7700";
  private static readonly MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY;

  private readonly client: ReturnType<
    typeof instantMeiliSearch
  > = instantMeiliSearch(
    MeilisearchService.MEILISEARCH_HOST,
    MeilisearchService.MEILISEARCH_API_KEY
  );

  async search(index: string, query: string, options = {}) {
    try {
      const results = await this.client.searchClient.search([
        {
          indexName: index,
          query,
          params: options,
        },
      ]);

      return results.results[0]?.hits || [];
    } catch (error) {
      console.error("Error searching Meilisearch:", error);
      return [];
    }
  }
}

export const meilisearchService = new MeilisearchService();

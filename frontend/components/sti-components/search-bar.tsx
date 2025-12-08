import { useEffect, useState } from "react";
import { meilisearchService } from "../../services/meilisearch.service";
import ArticleList, { ArticleListType } from "./article-list";
import { useRouter } from "next/router";

interface SearchBarProps {
  config: {
    placeholder: string;
    textButton: string;
  }
}

const SearchBar = ({ config:{
    placeholder, textButton
}}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const searchService = meilisearchService;
  const router = useRouter();

  const handleSearch = async (search?: string) => {
    const decidedSearch = search || searchValue;
    if (decidedSearch) {
      router.push(`/search?q=${encodeURIComponent(decidedSearch)}`, undefined, { shallow: true });

      const results = await searchService.search("post", decidedSearch);
      setResults(results);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    const q = params.get("q");
    if (q) {
      setSearchValue(q);
      handleSearch(q);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 mx-10 my-4">
      <div className="min-w-1/2 flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          className="border border-gray-400 rounded-md p-2 w-100 outline-0 text-gray-500 dark:text-gray-200 hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-gray-600 transition placeholder:italic dark:placeholder:gray-400 bg-gray-100 dark:bg-gray-700"
          value={searchValue || ""}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
        />

        <button
          className="bg-gray-600 text-white rounded-md px-4 py-2 font-semibold mr-2 cursor-pointer hover:bg-gray-700 transition"
          onClick={() => handleSearch()}
        >
          {textButton}
        </button>

        {results && (
          <button
            className="self-center text-gray-500 underline hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-400 cursor-pointer transition"
            onClick={() => {
              setResults(null);
              setSearchValue(null);
            }}
          >
            Reset
          </button>
        )}
      </div>

      {results && (
        <div className="mt-4 w-full">
          <ArticleList config={{ title: `Search Results (${results.length})`, type: ArticleListType.LINE }} posts={{
            data: results || []
          }} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import { useEffect, useState } from "react";
import { meilisearchService } from "../../services/meilisearch.service";
import ArticleList, { ArticleListType, LineByLineArticleList } from "./article-list";
import { useRouter } from "next/router";
import Button from "../common/button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  config: {
    placeholder: string;
    textButton: string;
  }
}

const SearchBar = ({ config: {
  placeholder, textButton
} }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searched, setSearched] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const searchService = meilisearchService;
  const router = useRouter();

  const handleSearch = async (search?: string) => {
    const decidedSearch = search || searchValue;
    if (decidedSearch) {
      router.push(`/search?q=${encodeURIComponent(decidedSearch)}`, undefined, { shallow: true });
    }

    const results = await searchService.search("post", decidedSearch || "");
    setResults(results);
    setSearched(decidedSearch || "");
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
    <div className="max-w-[840px] flex flex-col pt-12 pb-20 px-6 mx-auto">
      <h1 className="text-[42px] font-heading mb-2 font-medium">Search</h1>
      <p className="text-neutral-500 mb-7">Articles, tags, categories and authors.</p>
      <div className="min-w-1/2 flex gap-2.5 mb-8">
        <input
          type="text"
          placeholder={placeholder}
          className="border border-divider rounded-md py-1.5 px-2.5 w-full outline-none text-gray-500 dark:text-gray-200 hover:border-[#777882] focus:border-accent transition placeholder:italic dark:placeholder:gray-400 bg-gray-100 dark:bg-surface"
          value={searchValue || ""}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
        />

        <Button
          text={textButton}
          onClick={() => handleSearch()}
          icon={faSearch}
        />
      </div>

      {results && <div className="text-[13px] text-neutral-500 mb-4">
        {results.length} result{results.length > 1 ? "s" : ""} {searched && "for \"" + searched + "\""}
      </div>}

      {results && (
        <div className="w-full">
          <LineByLineArticleList posts={results} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../common/button";
import { GridArticleList, LineByLineArticleList, TwoByColumnArticleList } from "./article-list";
import BreadCrumb from "../common/breadcrumb";

interface CategoryListProps {
  config: {
    type: "Grid" | "Line" | "Two-by-line";
  }
}

const CategoryList = ({ config: {
  type,
} }: CategoryListProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const fetchCategories = await fetch("/api/categories");
      const data = await fetchCategories.json();
      setCategories(data.data);

      const params = new URLSearchParams(globalThis.location.search);
      const slug = params.get("slug");
      if (slug) {
        if (data.data.some((category: any) => category.slug === slug)) {
          setCategorySelected(slug);
        } else {
          console.warn(`Category with slug "${slug}" not found. Defaulting to the first category.`);
          setCategorySelected(data.data[0]?.slug || null);
          router.push(`/categories?slug=${data.data[0]?.slug}`, undefined, { shallow: true });
        }
      } else {
        setCategorySelected(data.data[0]?.slug || null);
        router.push(`/categories?slug=${data.data[0]?.slug}`, undefined, { shallow: true });
      }
    };
    if (categories.length === 0) {
      getCategories();
    }

  }, [categories]);

  return (
    <div className="flex flex-col pt-12 pb-20 px-6 mx-auto">
      <BreadCrumb
        items={[
          { label: "Categories" },
          { label: categories.find(e => e.slug === categorySelected)?.name || "Loading..." },
        ]}
      />

      <div className="flex justify-between items-end gap-y-6 gap-x-8 flex-wrap pb-[26px] border-b border-divider">
        <div>
          <h1 className="text-[clamp(30px,4vw,42px)] font-heading leading-[1.05] mb-3 font-medium">{categories.find(e => e.slug === categorySelected)?.name}</h1>
          <p className="text-neutral-400 max-w-[56ch] m-0 text-[15px] leading-[1.6]">{categories.find(e => e.slug === categorySelected)?.description}</p>
        </div>

        <div className="pb-1">
          <div className="font-heading text-[26px] leading-7">{categories.find(e => e.slug === categorySelected)?.posts?.length}</div>
          <div className="text-[11px] tracking-[0.09em] uppercase text-neutral-500 mt-1">articles</div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-[22px] mb-10">
        {categories.map((category) => (
          <Button
            text={category.name}
            key={category.slug}
            variant={category.slug === categorySelected ? "primary" : "secondary"}
            nbOfItems={category.posts?.length || 0}
            onClick={() => {
              setCategorySelected(category.slug);
              router.push(`/categories?slug=${category.slug}`, undefined, { shallow: true });
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-3.5 mb-5">
        <h2 className="font-heading text-[19px]! m-0! whitespace-nowrap">Articles in {categories.find(e => e.slug === categorySelected)?.name}</h2>
        <span className="flex-1 h-px bg-linear-to-r from-divider to-transparent"></span>
      </div>

      <div>
        {type === "Two-by-line" && <TwoByColumnArticleList posts={categories.find(e => e.slug === categorySelected)?.posts || []} />}
        {type === "Grid" && <GridArticleList posts={categories.find(e => e.slug === categorySelected)?.posts || []} />}
        {type === "Line" && <LineByLineArticleList posts={categories.find(e => e.slug === categorySelected)?.posts || []} />}
      </div>
    </div>
  );
};

export default CategoryList;

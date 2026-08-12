import ArticleList from "./article-list";
import CategoryList from "./category-list";
import Code from "./code";
import FeaturedArticle from "./featured-article";
import Headin from "./heading";
import ImageSti from "./image";
import LatestPost from "./latest-post";
import List from "./list";
import { Paragraph } from "./paragraph";
import Quote from "./quote";
import SearchBar from "./search-bar";
import { Text } from "./text";

export const stiComponents = {
  "collection.article-list": ArticleList,
  "collection.category-list": CategoryList,
  code: Code,
  "collection.featured-article": FeaturedArticle,
  image: ImageSti,
  "collection.latest-articles": LatestPost,
  heading: Headin,
  list: List,
  paragraph: Paragraph,
  quote: Quote,
  "collection.search-bar": SearchBar,
  text: Text,
};

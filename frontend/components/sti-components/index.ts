import ArticleList from "./article-list";
import Code from "./code";
import FeaturedArticle from "./featured-article";
import Headin from "./heading";
import ImageSti from "./image";
import List from "./list";
import { Paragraph } from "./paragraph";
import { Text } from "./text";

export const stiComponents = {
  "collection.article-list": ArticleList,
  code: Code,
  "collection.featured-article": FeaturedArticle,
  image: ImageSti,
  heading: Headin,
  list: List,
  paragraph: Paragraph,
  text: Text,
};

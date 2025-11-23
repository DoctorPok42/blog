import { StiComponentRenderer } from "../sti-component-renderer";

interface FeaturedArticleProps {
  config: {
    post: {
      content?: Array<any>;
    };
  }
}

const FeaturedArticle = ({ config: {
  post
}}: FeaturedArticleProps) => {
  return (
    <>
      {post?.content?.map((child: { type: string }, index: any) => (
        <StiComponentRenderer key={index} type={child.type} config={child} />
      ))}
    </>
  )
};

export default FeaturedArticle;

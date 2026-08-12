import { StiComponentRenderer } from "../sti-component-renderer";

interface QuoteProps {
  config: {
    children: Array<any>;
  }
}

const Quote = ({ config: {
  children
} }: QuoteProps) => {
  const content = children.map((child: { type: string }, index: any) => (
    <StiComponentRenderer key={index + "-code"} type={child.type} config={child} />
  ));

  return (
    <div className="my-8 pl-[22px] border-l-2 border-accent">
      <blockquote className="text-[21px] font-heading font-medium leading-[1.45] whitespace-break-spaces">
        {content}
      </blockquote>
    </div>
  );
};

export default Quote;

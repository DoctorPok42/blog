import { StiComponentRenderer } from "../sti-component-renderer";

interface QuoteProps {
  config: {
    children: Array<any>;
  }
}

const Quote = ({ config: {
  children
}}: QuoteProps) => {
  const content = children.map((child: { type: string }, index: any) => (
    <StiComponentRenderer key={index + "-code"} type={child.type} config={child} />
  ));

  return (
    <blockquote className="bg-[#f8fafc] dark:bg-slate-900 py-2 pl-4 border-l-4 border-[#e2e8f0] dark:border-slate-600 dark:text-gray-300 text-gray-600 flex gap-1">
      {content}
    </blockquote>
  );
};

export default Quote;

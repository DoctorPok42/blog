import { StiComponentRenderer } from "../sti-component-renderer";

interface ParagraphProps {
  config: {
    children: Array<any>;
  },
  options?: { [key: string]: any  };
}

export const Paragraph = ({ config, options }: ParagraphProps) => {
  return <span className="flex flex-wrap my-4 gap-x-1">
    {
      config.children.map((child: { type: string }, index) => (
        <StiComponentRenderer key={index} type={child.type} config={child} options={options} />
      ))
    }
  </span>;
}

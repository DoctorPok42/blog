import { StiComponentRenderer } from "../sti-component-renderer";

interface CodeProps {
  config: {
    language: string;
    children: Array<any>;
  }
}

const Code = ({ config: {
  language, children
}}: CodeProps) => {
  const content = children.map((child: { type: string }, index: any) => (
    <StiComponentRenderer key={index} type={child.type} config={child} />
  ));

  return (
    <pre className="w-full mt-2 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg overflow-x-auto">
      {content}
    </pre>
  );
};

export default Code;

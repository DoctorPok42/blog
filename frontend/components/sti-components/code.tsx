import { StiComponentRenderer } from "../sti-component-renderer";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
    <StiComponentRenderer key={index + "-code"} type={child.type} config={child} />
  ));

  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{
        borderRadius: 12,
        padding: 16,
        marginTop: "-30px",
        marginBottom: "-30px",
        border: "1px solid #505050",
      }}
    >
      {content.map((item: any) => item.props.config.text)}
    </SyntaxHighlighter>
  );
};

export default Code;

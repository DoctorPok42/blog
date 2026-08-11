import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StiComponentRenderer } from "../sti-component-renderer";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { faClone } from "@fortawesome/free-solid-svg-icons";

interface CodeProps {
  config: {
    language: string;
    children: Array<any>;
  }
}

const Code = ({ config: {
  language, children
} }: CodeProps) => {
  const content = children.map((child: { type: string }, index: any) => (
    <StiComponentRenderer key={index + "-code"} type={child.type} config={child} />
  ));

  return (
    <div className="w-full relative">
      <SyntaxHighlighter
        language={language}
        style={nord}
        customStyle={{
          borderRadius: 8,
          padding: 16,
          marginTop: "-30px",
          marginBottom: "-30px",
          backgroundColor: "#181a24",
        }}
      >
        {content.map((item: any) => item.props.config.text)}
      </SyntaxHighlighter>

      <div className="absolute top-2 right-2 p-2 border-[1.5px] border-divider rounded-md flex items-center justify-center text-neutral-500 cursor-pointer hover:text-accent-600 hover:border-accent-600 transition-colors duration-200" onClick={() => { const codeText = content.map((item: any) => item.props.config.text).join("\n"); navigator.clipboard.writeText(codeText) }}>
        <FontAwesomeIcon icon={faClone} />
      </div>
    </div>
  );
};

export default Code;

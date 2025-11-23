import { Text } from "./text";

interface ListProps {
  config: {
    format: "ordered" | "unordered";
    children?: Array<any>;
  }
}

const List = ({ config: {
  format, children
}}: ListProps) => {
  const content = children?.map((item: { children: Array<any> }, index: number) => {
    return <li key={index}>
      &bull; {" "} <Text config={item.children[0]}/>
    </li>;
  });
  return (
    format === "ordered" ? <ol>{content}</ol> : <ul>{content}</ul>
  );
};

export default List;

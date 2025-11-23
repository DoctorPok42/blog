import { StiComponentRenderer } from "../sti-component-renderer";

interface HeadinProps {
  config: {
    children: Array<any>;
    level: number;
  }
}

const Headin = ({ config: {
  children, level
} }: HeadinProps) => {
  const content = children.map((child: { type: string }, index) => (
    <StiComponentRenderer key={index} type={child.type} config={child} />
  ));

  switch (level) {
    case 1:
      return <h1 className="text-2xl font-bold">{content}</h1>;
    case 2:
      return <h2 className="text-xl font-semibold">{content}</h2>;
    case 3:
      return <h3 className="text-lg font-medium">{content}</h3>;
    case 4:
      return <h4 className="text-base font-normal">{content}</h4>;
    case 5:
      return <h5 className="text-sm font-light">{content}</h5>;
    case 6:
      return <h6 className="text-xs font-thin">{content}</h6>;
  }
};

export default Headin;

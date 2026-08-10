import { StiComponentRenderer } from "../sti-component-renderer";

interface HeadinProps {
  config: {
    children: Array<any>;
    level: number;
    id?: string;
  }
}

const Headin = ({ config: {
  children, level, id
} }: HeadinProps) => {
  const content = children.map((child: { type: string }, index) => (
    <StiComponentRenderer key={index + "-child"} type={child.type} config={child} />
  ));

  const headingProps = id ? { id } : {};

  switch (level) {
    case 1:
      return <h1 className="text-3xl font-bold" {...headingProps}>{content}</h1>;
    case 2:
      return <h2 className="text-2xl font-semibold scroll-mt-20" {...headingProps}>{content}</h2>;
    case 3:
      return <h3 className="text-xl font-medium" {...headingProps}>{content}</h3>;
    case 4:
      return <h4 className="text-lg font-normal" {...headingProps}>{content}</h4>;
    case 5:
      return <h5 className="text-base font-light" {...headingProps}>{content}</h5>;
    case 6:
      return <h6 className="text-sm font-thin" {...headingProps}>{content}</h6>;
  }
};

export default Headin;

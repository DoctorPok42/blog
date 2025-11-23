export enum Modifier {
  Bold = "bold",
  Italic = "italic",
  Underline = "underline",
  Strikethrough = "strikethrough",
  Code = "code",
}

interface TextProps {
  config: {
    text: string;
  } & Partial<Record<Modifier, boolean>>,
  options?: { [key: string]: any  };
}

const modifiersComponents: Record<Modifier, React.FC<{ children: React.ReactNode }>> = {
  [Modifier.Bold]: ({ children }) => <span className="font-bold">{children}</span>,
  [Modifier.Italic]: ({ children }) => <span className="italic">{children}</span>,
  [Modifier.Underline]: ({ children }) => <span className="underline">{children}</span>,
  [Modifier.Strikethrough]: ({ children }) => <del>{children}</del>,
  [Modifier.Code]: ({ children }) => <code className="bg-light">{children}</code>,
};

export const Text = ({ config, options }: TextProps) => {
  const modifierNames = Object.keys(config) as Array<Modifier>;

  return modifierNames.reduce(
    (content, modifierName) => {
      if (modifiersComponents[modifierName] === undefined || !config[modifierName]) {
        return content;
      }

      const ModifierComponent = modifiersComponents[modifierName];

      return <ModifierComponent>{content}</ModifierComponent>;
    },
    <span className={options?.textColor}>{config.text}<br /></span>
  );
}

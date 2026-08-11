interface TagProps {
  text?: string;
  title?: string;
  variant?: 'accent' | 'neutral' | 'outline';
  divClass?: string
}

const colorClass = {
  "accent": "bg-[#423a6a] text-[#f5f4ff]",
  "neutral": "bg-[#3f424d] text-[#f3f5fe]",
  "outline": "bg-transparent border border-[#9184d9] text-[#9184d9]"
}

const Tag = ({
  text, title, variant = 'accent', divClass
}: TagProps) => {
  return (
    <div title={title} className={`flex items-center justify-center text-[11px] py-[3px] tracking-[0.02em] px-2.5 rounded-[6px] transition duration-200 ${colorClass[variant] || colorClass.accent} ${divClass}`}>
      {text && <span>{text}</span>}
    </div>
  );
};

export default Tag;

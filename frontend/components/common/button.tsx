import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  text?: string;
  title?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  icon?: FontAwesomeIconProps['icon'];
  svg?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  divClass?: string;
  nbOfItems?: number;
}

const colorClass = {
  "primary": "text-[#9184d9] border border-[#9184d9] hover:bg-[#24253b] cursor-pointer",
  "secondary": "text-[color-mix(text, #9184d9)] border border-divider hover:bg-btn cursor-pointer",
  "ghost": "text-[#9184d9] hover:bg-[#232338] cursor-pointer"
}

const Button = ({
  text, title, onClick, variant = 'primary', disabled = false, icon, svg, iconPosition = 'left', divClass, nbOfItems
}: ButtonProps) => {
  return (
    <div title={title} onClick={disabled ? undefined : onClick} className={`flex gap-1.5 items-center justify-center text-[14.5px] py-[5.6px] px-2.5 rounded-md font-medium border transition duration-200 ${colorClass[variant] || colorClass.primary} ${divClass}`} style={{ ...(disabled ? { cursor: 'not-allowed', userSelect: 'none' } : {}) }}>
      {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} />}
      {svg && iconPosition === 'left' && <span>{svg}</span>}
      {text && <span>{text}</span>}

      {!!(nbOfItems) && <span className={`text-[11px] py-0.5 px-2 ${variant === "primary" ? "bg-accent-800" : "bg-neutral-800"} rounded-md tracking-[0.09em] uppercase text-white`}>{nbOfItems}</span>}

      {svg && iconPosition === 'right' && <span>{svg}</span>}
      {icon && iconPosition === 'right' && <FontAwesomeIcon icon={icon} />}
    </div>
  );
};

export default Button;

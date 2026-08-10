import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  text?: string;
  title?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  icon?: FontAwesomeIconProps['icon'];
  iconPosition?: 'left' | 'right';
  divClass?: string
}

const colorClass = {
  "primary": "text-[#9184d9] border border-[#9184d9] hover:bg-[#24253b] cursor-pointer",
  "secondary": "text-[#e9e9ed] border border-divider hover:bg-[#242634] cursor-pointer",
  "ghost": "text-[#9184d9] hover:bg-[#232338] cursor-pointer"
}

const Button = ({
  text, title, onClick, variant = 'primary', disabled = false, icon, iconPosition = 'left', divClass
}: ButtonProps) => {
  return (
    <div title={title} onClick={disabled ? undefined : onClick} className={`flex gap-1.5 items-center justify-center text-[14.5px] py-[5.6px] px-2.5 rounded-md font-bold border transition duration-200 ${colorClass[variant] || colorClass.primary} ${divClass}`} style={{ ...(disabled ? { cursor: 'not-allowed', userSelect: 'none' } : {}) }}>
      {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} />}
      {text && <span>{text}</span>}
      {icon && iconPosition === 'right' && <FontAwesomeIcon icon={icon} />}
    </div>
  );
};

export default Button;

import { useEffect, useState } from "react";
import { HeaderData } from "../../services/data.service";
import Image from "next/image";
import Link from "next/link";
import { faDisplay, faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Mode, useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  nav: HeaderData["nav"];
}

const Header = ({ nav }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const { mode, setThemeMode, mounted } = useTheme();

  const order: Mode[] = ["system", "light", "dark"];
  const icons: Record<Mode, FontAwesomeIconProps["icon"]> = {
    light: faSun,
    dark: faMoon,
    system: faDisplay
  };
  const labels: Record<Mode, string> = {
    light: "Light mode",
    dark: "Dark mode",
    system: "System mode"
  };

  useEffect(() => {
    const path = globalThis.location.pathname;
    setActiveLink(path);
  }, [globalThis.location?.pathname]);

  if (!mounted) {
    return null;
  }

  const cycle = () => {
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setThemeMode(next);
  };

  return (
    <div className="border-b border-divider">
      <div className="max-w-[1180px] mx-auto py-3.5 px-6 flex items-center justify-between">
        <div className="text-lg font-semibold flex gap-2 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-mark-transparent.svg" alt="Logo" width={24} height={24} />
            My blog
          </Link>
        </div>

        <div className={`flex items-center gap-4`}>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex gap-[22px] text-[14px]">
                {nav.map((item, index) => (
                  <li key={index + "-nav-item"}>
                    <Link href={item.link} className={`font-semibold hover:text-accent-2 hover:underline ${activeLink === item.link ? 'text-accent' : ''}`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`flex items-center gap-2.5`}>
            <Link href="/search" className="bg-bg w-9 h-9 rounded-md border border-divider hover:bg-btn flex items-center justify-center cursor-pointer transition duration-200" title="Search">
              <FontAwesomeIcon icon={faSearch} className="text-[13.33px]" />
            </Link>

            <button type="button" onClick={cycle} title={labels[mode]} className="bg-bg w-9 h-9 rounded-md border border-divider hover:bg-btn flex items-center justify-center cursor-pointer transition duration-200">
              <FontAwesomeIcon icon={icons[mode]} className="text-[13.33px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

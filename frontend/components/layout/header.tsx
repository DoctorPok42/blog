import { useEffect, useState } from "react";
import { HeaderData } from "../../services/data.service";
import Image from "next/image";
import Link from "next/link";
import { faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderProps {
  nav: HeaderData["nav"];
}

const Header = ({ nav }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const path = globalThis.location.pathname;
    setActiveLink(path);
  }, [globalThis.location?.pathname]);

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
                    <Link href={item.link} className={`font-semibold hover:underline ${activeLink === item.link ? 'text-[#A7A1DB]' : ''}`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`flex items-center gap-2.5`}>
            <Link href="/search" className="w-9 h-9 rounded-md border border-divider hover:bg-[#242634] flex items-center justify-center cursor-pointer ">
              <FontAwesomeIcon icon={faSearch} color="#E9E9ED" className="text-[13.33px]" />
            </Link>

            <button type="button" onClick={() => setDarkMode(!darkMode)} className="w-9 h-9 rounded-md border border-divider hover:bg-[#242634] flex items-center justify-center cursor-pointer ">
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} color="#E9E9ED" className="text-[13.33px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

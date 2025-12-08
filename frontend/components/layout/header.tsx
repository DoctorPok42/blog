import { useEffect, useState } from "react";
import { HeaderData } from "../../services/data.service";

interface HeaderProps {
  nav: HeaderData["nav"];
}

const Header = ({ nav }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const path = globalThis.location.pathname;
    setActiveLink(path);
  }, []);

  return (
    <div className="bg-gray-800 font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto py-4 px-16 text-white bg-gray-500 dark:bg-gray-900 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">My Blog</div>

        <div className="flex gap-8 items-center">
          <nav>
            <ul className="flex space-x-8">
              {nav.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className={`font-semibold text-white hover:underline ${activeLink === item.link ? 'text-yellow-300 dark:text-yellow-400' : ''}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
          </div>

          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSearchOpen ? 'max-w-xs ml-4' : 'max-w-0'}`}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

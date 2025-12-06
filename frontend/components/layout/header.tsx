import { useState } from "react";
import { HeaderData } from "../../services/data.service";

interface HeaderProps {
  nav: HeaderData["nav"];
}

const Header = ({ nav }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-800 font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto py-4 px-16 text-white bg-gray-600 dark:bg-gray-900 flex items-center justify-between">
        <div className="text-2xl font-bold">My Blog</div>

        <div className="flex gap-8 items-center">
          <nav>
            <ul className="flex space-x-8">
              {nav.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className={`font-semibold hover:underline ${activeLink === item.slug ? 'text-yellow-400' : ''}`}>
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

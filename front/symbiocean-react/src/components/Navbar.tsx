import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import NavbarCSS from "./Navbar.module.css"; // Import the CSS module

interface NavbarProps {
  mode?: string;  // Optional prop for mode
}

const Navbar = ({ mode }: NavbarProps) => {
  const [toggledLink, setToggledLink] = useState<string | null>(null);

  // Set the initial state of toggledLink based on the mode prop
  useEffect(() => {
    if (mode === "quiz") {
      setToggledLink("quiz"); // If mode is "quiz", toggle the Quiz link by default
    }
  }, [mode]);

  const handleToggle = (link: string) => {
    // Toggle the active state for the clicked link
    setToggledLink(link === toggledLink ? null : link);
  };

  return (
    <nav className={NavbarCSS.navbar}>
      <div className={NavbarCSS.container}>
        <div className={NavbarCSS.navbarContent}>
          <div className={NavbarCSS.logoContainer}>
            <img src={logo} alt="Symbiocean" className={NavbarCSS.logo} />
            <span className={NavbarCSS.navbarTitle}>
              <a className={NavbarCSS.navbarTitleLink} href="/quiz">Symbiocean</a>
            </span>
          </div>
          <ul className={NavbarCSS.navbarLinks}>
            <li
              className={toggledLink === "quiz" ? `${NavbarCSS.navbarItem} ${NavbarCSS.toggled}` : NavbarCSS.navbarItem}
              onClick={() => handleToggle("quiz")}
            >
              <a
                href="/quiz"
                className={NavbarCSS.navbarLink}
              >
                Quiz
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

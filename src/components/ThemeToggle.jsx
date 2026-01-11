import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-yellow-500 shadow-md btn btn-ghost btn-circle dark:text-blue-400"
    >
      {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} />}
    </button>
  );
};

export default ThemeToggle;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Get the appropriate links
  const getLinks = () => {
    const links = [
      { title: "Home", link: "/" },
      { title: "All Books", link: "/all-books" }
    ];

    if (isLoggedIn) {
      // Only show Cart for regular users (not admins)
      if (role === "user") {
        links.push({ title: "Cart", link: "/cart" });
      }
      
      // Single profile link for both users and admins
      links.push({ 
        title: role === "admin" ? "Admin Profile" : "Profile", 
        link: "/profile" 
      });
    }

    return links;
  };

  // Condition to show Help button
  const showHelpButton = !(isLoggedIn && role === "admin");

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-4 md:px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-8 md:h-10 me-3 md:me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-xl md:text-2xl font-semibold">BookNest</h1>
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center gap-6">
          {getLinks().map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={
                item.title.includes("Profile")
                  ? "px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  : "hover:text-blue-500 transition-all duration-300"
              }
            >
              {item.title}
            </Link>
          ))}

          {/* Add Help Button - only show if not admin */}
          {showHelpButton && (
            <Link
              to="/help"
              className="px-4 py-1 border border-green-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              Help
            </Link>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/SignIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignIn
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="block md:hidden text-white text-2xl hover:text-zinc-400 transition-all duration-300"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? <FaTimes /> : <FaGripLines />}
        </button>
      </nav>

      {/* Mobile Navbar */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-800/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          mobileNavOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center">
          {getLinks().map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={
                item.title.includes("Profile")
                  ? "text-white text-2xl mb-6 px-6 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  : "text-white text-2xl mb-6 hover:text-blue-500 transition-all duration-300"
              }
              onClick={closeMobileNav}
            >
              {item.title}
            </Link>
          ))}

          {/* Add Help Button for Mobile - only show if not admin */}
          {showHelpButton && (
            <Link
              to="/help"
              className="text-white text-2xl mb-6 px-6 py-2 border border-green-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={closeMobileNav}
            >
              Help
            </Link>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/SignIn"
                className="px-6 mb-6 text-2xl py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={closeMobileNav}
              >
                SignIn
              </Link>
              <Link
                to="/SignUp"
                className="px-6 mb-6 text-2xl py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={closeMobileNav}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
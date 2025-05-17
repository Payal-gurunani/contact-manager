import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const showContactsLink = isLoggedIn && location.pathname === "/contact";

  return (
    <header className="bg-gray-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Contact Manager</h1>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-600 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/home"
              className="block px-4 py-2 hover:bg-gray-400 hover:text-black md:inline-block"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* Show Contacts link only on /contact page when logged in */}
          {showContactsLink && (
            <li>
              <Link
                to="/view-contacts"
                className="block px-4 py-2 hover:bg-gray-400 hover:text-black md:inline-block"
                onClick={() => setIsOpen(false)}
              >
                Contacts
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-400 hover:text-black md:inline-block"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

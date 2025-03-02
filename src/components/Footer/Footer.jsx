import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-6 w-full transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Logo */}
      

        {/* Links */}
        <ul className="flex space-x-6 mt-4">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contactus" }
          ].map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-6">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-xl hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          © 2025 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

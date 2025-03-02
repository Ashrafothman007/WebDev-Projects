import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";


import { FaBars, FaTimes, FaHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setIsOpen(false);
    navigate("/login");
  }

  useEffect(() => {
    setIsOpen(false);
  }, [token]);

  return (
    <nav className="bg-blue-100 dark:bg-gray-900 shadow-md fixed w-full top-0 left-0 right-0 z-50">
      <div className="container mx-auto py-3 flex justify-between items-center px-5">
        
      <NavLink to={'/'}>
  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">Fresh Cart</span>
</NavLink>


        <button
          className="lg:hidden text-gray-900 dark:text-gray-300 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {token && (
          <ul className={`lg:flex lg:items-center fixed lg:static bg-blue-100 dark:bg-gray-900 
            top-16 left-0 w-full lg:w-auto shadow-lg lg:shadow-none p-5 lg:p-0 
            transition-transform duration-300 ease-in-out 
            ${isOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}>
            
            {[ 
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Categories", path: "/categories" },
              { name: "Brands", path: "/brands" },
            ].map((link, index) => (
              <li key={index} className="py-2 lg:py-0">
                <NavLink 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-md font-medium block px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 
                    ${isActive ? "text-blue-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-gray-500"}`
                  }
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <li className="relative py-2 lg:py-0">
              <NavLink
                to="/wishlist"
                className="text-md font-medium flex items-center px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 text-gray-900 dark:text-gray-300 hover:text-red-500"
              >
                <FaHeart className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlist?.length || 0}
                </span>
              </NavLink>
            </li>

            <li className="relative py-2 lg:py-0">
              <NavLink
                to="/cart"
                className="text-md font-medium flex items-center px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-gray-500"
              >
                <FaShoppingCart className="text-xl relative" />
                <span className="absolute -top-1 -right-1 bg-blue-500 dark:bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart?.numOfCartItems || 0}
                </span>
              </NavLink>
            </li>

            <button
              onClick={logout}
              className="flex items-center bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 
              px-4 py-2 rounded-md text-white font-medium md:hidden"
            >
              <FaSignOutAlt className="mr-2" />
              Log Out
            </button>
          </ul>
        )}

        <div className="lg:flex items-center hidden">
          {token ? (
            <button
              onClick={logout}
              className="flex items-center bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-white font-medium"
            >
              <FaSignOutAlt className="mr-2" />
              Log Out
            </button>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className="bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 
                px-4 py-2 rounded-md text-white font-medium mx-2">
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="bg-blue-400 hover:bg-blue-500 dark:bg-gray-600 dark:hover:bg-gray-500 
                px-4 py-2 rounded-md text-white font-medium">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

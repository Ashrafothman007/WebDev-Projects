import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

export default function ProductsCard({ product }) {
  const { imageCover, description, price, title, _id, ratingsAverage } = product;
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLiked(wishlist.some(item => item._id === _id));
  }, [wishlist, _id]);

  const toggleWishlist = useCallback(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    liked ? removeFromWishlist(_id) : addToWishlist(product);
    setLiked(!liked);
  }, [liked, _id, product, addToWishlist, removeFromWishlist]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(_id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="w-full p-4 bg-blue-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
      <Link to={`/details/${_id}`} className="block">
        <img className="rounded-lg w-full h-44 object-cover" src={imageCover} alt="Product" />
        <div className="py-3 flex-grow">
          <h5 className="text-base font-bold text-gray-900 dark:text-white">
            {title.length > 40 ? `${title.slice(0, 37)}...` : title}
          </h5>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            {description?.slice(0, 50)}... <span className="text-blue-600 dark:text-blue-400">Show More</span>
          </p>
          <div className="flex items-center mt-2">
            {[...Array(fullStars)].map((_, index) => <FaStar key={index} className="text-yellow-400 text-sm" />)}
            {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
            {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
              <FaStar key={index + fullStars + 1} className="text-gray-400 text-sm" />
            ))}
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm font-medium">
              {ratingsAverage.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
          ${price}
        </span>
        <button
          onClick={toggleWishlist}
          className={`text-2xl transition-transform duration-300 ease-in-out hover:rotate-12 active:scale-95 transform hover:scale-125 focus:outline-none ${liked ? "text-red-500" : "text-gray-400"} ${animate ? "animate-bounce" : ""}`}
        >
          <FaHeart />
        </button>
      </div>

    
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full mt-auto text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}

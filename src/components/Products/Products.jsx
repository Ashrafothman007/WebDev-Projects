import React from 'react';
import { BeatLoader } from 'react-spinners';
import useProducts from '../../Hooks/useProducts';
import ProductsCard from '../ProductsCard/ProductsCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
  const { allProducts, prodLoad, error } = useProducts();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const brandId = params.get('brand');
  const categoryId = params.get('category');
  const navigate = useNavigate();

  const fetchTitle = async () => {
    if (brandId) {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      return data.data.name;
    } else if (categoryId) {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`);
      return data.data.name;
    }
    return "All Products";
  };

  const { data: pageTitle } = useQuery({
    queryKey: ['pageTitle', brandId, categoryId],
    queryFn: fetchTitle,
    enabled: !!brandId || !!categoryId,
  });

  return (
    <>
      <div className="flex justify-center items-center mb-6 pt-12">
        <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-blue-400 via-white to-blue-400 text-gray-900 dark:text-gray-100 shadow-md tracking-wide rounded-lg">
          {pageTitle || "All Products"}
        </h2>
      </div>

      {prodLoad && (
        <div className="w-full h-screen flex justify-center items-center">
          <BeatLoader color="#60a5fa" size={15} />
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-bold my-4">
          Failed to load products. Please try again.
        </div>
      )}

      {!prodLoad && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 container mx-auto">
          {allProducts?.length > 0 ? (
            allProducts.map((product) => <ProductsCard key={product._id} product={product} />)
          ) : (
            <p className="text-center min-h-screen col-span-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-200 to-gray-500 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
              <span className="text-7xl mb-4 animate-bounce">🔍</span>
              <span className="text-3xl font-extrabold">No Products Found</span>
              <span className="text-gray-600 dark:text-gray-300 mt-2 text-lg">Try exploring other categories!</span>
              <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300"
              >
                Go Back
              </button>
            </p>
          )}
        </div>
      )}
    </>
  );
}

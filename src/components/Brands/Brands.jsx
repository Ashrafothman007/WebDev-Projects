import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

export default function Brands() {

  const getBrands = async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    return data;
  };

  const { data: brandsData, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-blue-400 via-white to-blue-400 
        text-gray-900 dark:text-gray-300 shadow-md tracking-wide rounded-lg space-x-2">
          All Brands
        </h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#60a5fa" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brandsData?.data?.map((brand) => (
            <Link
              key={brand._id}
              to={`/products?brand=${brand._id}`}
              className="relative cursor-pointer bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-md transition duration-300"
            >
              <img src={brand.image} alt={brand.name} className="w-full h-40 object-cover rounded-lg" />
              <h4 className="mt-3 text-center font-semibold text-gray-800 dark:text-gray-300">
                {brand.name}
              </h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

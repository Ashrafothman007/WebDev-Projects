import React from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import useCategories from '../../Hooks/useCategories'

export default function Categories() {
  const { allCatProd, catLoad } = useCategories()

  return (
    <>
      {catLoad ? (
        <div className='w-full h-screen flex justify-center items-center '>
          <BeatLoader color="#60a5fa" size={15} />
        </div>
      ) : (<>
        <div className="flex justify-center items-center mb-6 container mx-auto pt-12">
          <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-blue-400 via-white to-blue-400 
          text-gray-900 dark:text-gray-300 shadow-md tracking-wide rounded-lg space-x-2">
            All Categories
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10 container mx-auto px-3">

          {allCatProd?.data?.data.map((cat) => (
            <Link key={cat._id} to={`/products?category=${cat._id}`}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md transition-shadow duration-300 cursor-pointer relative overflow-hidden">
                <img src={cat.image} className='w-full h-64 object-cover' alt={cat.name} />
                <div className="absolute bottom-0 left-0 w-full bg-blue-500 dark:bg-gray-700 p-3">
                  <h4 className="text-white text-center text-xl font-bold">{cat.name}</h4>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </>)}
    </>
  )
}

import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';
import { BeatLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, updateProdCountToCart, removeProdFromCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState({ id: null, action: null });
  const [quantity, setQuantity] = useState({});
  const navigate = useNavigate();

  const handleUpdate = async (productId, newCount) => {
    if (newCount < 1) return;
    setLoadingState({ id: productId, action: 'update' });
    await updateProdCountToCart(productId, newCount);
    setLoadingState({ id: null, action: null });
  };

  const handleRemove = async (productId) => {
    setLoadingState({ id: productId, action: 'remove' });
    await removeProdFromCart(productId);
    setLoadingState({ id: null, action: null });
  };

  const handleInputChange = (productId, value) => {
    setQuantity(prev => ({ ...prev, [productId]: value }));
  };

  const handleInputBlur = (productId, value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue > 0) {
      handleUpdate(productId, newValue);
    } else {
      setQuantity(prev => ({
        ...prev,
        [productId]: cart.data.products.find(item => item.product.id === productId).count
      }));
    }
  };

  useEffect(() => {
    if (cart) {
      const initialQuantities = {};
      cart?.data?.products?.forEach(item => {
        initialQuantities[item.product.id] = item.count;
      });
      setQuantity(initialQuantities);
      setLoading(false);
    }
  }, [cart]);

  const totalPrice = cart?.data?.products?.reduce((total, item) => total + (item.price * item.count), 0);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BeatLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-12">
      <h2 className="text-center text-2xl font-bold mb-4 text-blue-600 dark:text-gray-300">
        Shopping Cart
      </h2>

      {cart?.data?.products?.length === 0 ? (
        <p className="text-center min-h-screen flex flex-col justify-center items-center text-gray-800 dark:text-gray-300">
          <span className="text-7xl mb-4">🔍</span>
          <span className="text-3xl font-extrabold">No Products Found</span>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-full shadow"
          >
            Go Back
          </button>
        </p>
      ) : (
        <>
          <div className="flex flex-col items-start mt-8 gap-4 lg:flex-row lg:justify-between lg:items-center">
            <span className="text-lg font-bold text-blue-800 dark:text-gray-300">
              Total Price: {totalPrice} EGP
            </span>
            <Link to={`/checkout`}>
              <button className="bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md">
                CheckOut
              </button>
            </Link>
          </div>

          <div className="grid gap-6 mt-6">
            {cart?.data?.products?.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 flex flex-col sm:flex-row">
                <img
                  src={item.product.imageCover}
                  className="w-full sm:w-40 h-40 object-cover rounded-lg mb-4 sm:mb-0"
                  alt={item.product.title}
                />

                <div className="flex-1 sm:ml-4">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-gray-300">
                    {item.product.title.slice(0, 50)}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    {loadingState.id === item.product.id && loadingState.action === 'update' ? (
                      <BeatLoader color="#3b82f6" size={8} />
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpdate(item.product.id, item.count - 1)}
                          className="p-1 h-8 w-8 text-blue-500 dark:text-gray-300 bg-white dark:bg-gray-700 border rounded-full"
                        >-</button>
                        <input
                          type="text"
                          value={quantity[item.product.id] || ''}
                          onChange={(e) => handleInputChange(item.product.id, e.target.value)}
                          onBlur={() => handleInputBlur(item.product.id, quantity[item.product.id])}
                          className="w-14 text-center border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                        />
                        <button
                          onClick={() => handleUpdate(item.product.id, item.count + 1)}
                          className="p-1 h-8 w-8 text-blue-500 dark:text-gray-300 bg-white dark:bg-gray-700 border rounded-full"
                        >+</button>
                      </>
                    )}
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

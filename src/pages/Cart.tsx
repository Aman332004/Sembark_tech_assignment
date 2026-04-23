import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);
  if (!context) return null;

  const redirectToProductDetailsPage = (id: number) => {
    console.log('id', id);
    navigate(`/product/${id}/details`);
  };

  return (
    <div className="bg-[#f8f6f2] min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <p
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 cursor-pointer hover:underline mb-6"
      >
        ← Back
      </p>

      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
        Your Cart
      </h1>

      {context.cart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 sm:mt-20 text-center">
          <p className="text-lg sm:text-xl text-gray-500 mb-4">
            Your cart is empty 🛒
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#1c1c2e] text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <AnimatePresence>
              {context.cart?.map((item) => (
                <motion.div
                  key={item?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      onClick={() => redirectToProductDetailsPage(item.id)}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded-lg p-1"
                    />

                    <div onClick={() => redirectToProductDetailsPage(item.id)}>
                      <h3 className="font-semibold text-sm sm:text-lg cursor-pointer">
                        {item?.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm cursor-pointer">
                        ₹ {item?.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-xl">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
                          context.decreaseQty(item.id);
                          toast('Decreased ➖');
                        }}
                        className="px-2 py-1 rounded hover:bg-white transition cursor-pointer"
                      >
                        −
                      </motion.button>

                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="font-medium"
                      >
                        {item.quantity}
                      </motion.span>

                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
                          context.increaseQty(item.id);
                          toast('Increased ➕');
                        }}
                        className="px-2 py-1 rounded hover:bg-white transition cursor-pointer"
                      >
                        +
                      </motion.button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        context.removeFromCart(item.id);
                        toast.error('Removed ❌');
                      }}
                      className="text-red-500 text-lg hover:scale-110 transition cursor-pointer"
                    >
                      🗑
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-10 sm:mt-12 bg-white p-5 sm:p-6 rounded-2xl shadow-md max-w-md ml-auto">
            <div className="flex justify-between text-base sm:text-lg mb-4">
              <span>Subtotal</span>
              <span className="font-semibold">₹ {context.total}</span>
            </div>

            <button
              onClick={() => toast.success('Proceeding to checkout ')}
              className="w-full bg-[#1c1c2e] text-white py-3 rounded-xl text-base sm:text-lg hover:opacity-90 transition"
            >
              Checkout → ₹ {context.total}
            </button>

            <button
              onClick={() => {
                context.clearCart();
                toast.error('Cart cleared');
              }}
              className="w-full mt-3 border py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

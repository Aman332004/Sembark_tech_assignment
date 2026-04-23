import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import CartContext from '../context/CartContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();

  const productCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext);

  if (!productCtx || !cartCtx) return null;

  const product = productCtx.products?.find((p) => p.id === Number(id));

  if (!product) return <p className="p-6 sm:p-10">Product not found</p>;

  return (
    <div className="bg-[#f8f6f2] min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <Link
        to="/"
        className="text-sm text-gray-500 hover:underline mb-6 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-md">
        <div className="flex items-center justify-center">
          <img
            src={product.images?.[0]}
            alt={product?.title}
            className="w-full max-w-sm sm:max-w-md object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            {product?.category?.name}
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4">
            {product?.title}
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            {product?.description}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            ₹ {product?.price}
          </h2>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              cartCtx.addToCart(product);
              toast.success('Added to cart 🛒');
            }}
            className="bg-[#1c1c2e] text-white px-6 sm:px-8 py-3 rounded-xl text-lg transition cursor-pointer w-full sm:w-fit"
          >
            + Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

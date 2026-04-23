import { Link } from 'react-router-dom';
import type { Product } from '../types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product.id}/details`}>
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition duration-300">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-32 sm:h-40 object-contain mb-4"
        />

        <p className="text-xs text-gray-400 uppercase tracking-widest">
          {product.category?.name}
        </p>

        <h3 className="text-sm sm:text-base lg:text-lg font-semibold mt-1">
          {product.title}
        </h3>

        <p className="text-base sm:text-lg lg:text-xl font-bold mt-2">
          ₹ {product.price}
        </p>

        <button className="mt-4 w-full bg-[#1c1c2e] text-white py-2 rounded-xl hover:opacity-90">
          + Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;

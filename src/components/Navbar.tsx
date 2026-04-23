import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const cartCtx = useContext(CartContext);
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-[#f8f6f2] border-b">
      <Link to="/" className="text-2xl font-semibold tracking-wide">
        Ecommerce <span className="text-gray-400">store</span>
      </Link>

      <Link
        to="/cart"
        className="flex items-center gap-3 bg-[#1c1c2e] text-white px-5 py-2 rounded-full shadow-md"
      >
        🛒
        <span>Cart</span>
        <span className="bg-green-400 text-black px-2 py-0.5 rounded-full text-sm">
          {cartCtx?.cart?.length || 0}
        </span>
        <span className="text-sm opacity-80">₹ {cartCtx?.total || 0}</span>
      </Link>
    </nav>
  );
};

export default Navbar;

import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const context = useContext(ProductContext);
  if (!context) return null;

  const { products, categories, selectedCategories, toggleCategory, loading } =
    context;

  return (
    <div className="bg-[#f8f6f2] min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="w-full lg:w-60">
          <h3 className="mb-4 font-semibold">Categories</h3>

          {categories?.map((cat) => (
            <label key={cat?.id} className="block mb-2 text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedCategories.includes(cat?.id)}
                onChange={() => toggleCategory(cat?.id)}
              />
              {cat?.name}
            </label>
          ))}
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm animate-pulse"
                >
                  <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-3 w-20 bg-gray-200 mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 mb-3"></div>
                  <div className="h-5 w-1/3 bg-gray-200 mb-4"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : products?.length === 0 ? (
            <div className="text-center mt-20 text-gray-500">
              <p className="text-lg sm:text-xl">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { createContext, useEffect, useState } from "react";
import type { Product } from '../types';
import { fetchProducts, fetchCategories } from '../api/productsApi';
import { createContext, useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  selectedCategories: number[];
  toggleCategory: (id: number) => void;
  loading: boolean;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(selectedCategories);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [selectedCategories]);

  // ✅ TOGGLE CATEGORY
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev?.includes(id) ? prev?.filter((c) => c !== id) : [...prev, id],
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories, 
        selectedCategories,
        toggleCategory,
        loading, 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

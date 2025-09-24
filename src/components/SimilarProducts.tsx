import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  currentProduct: Product;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProduct }) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimilarProducts();
  }, [currentProduct.id]);

  const fetchSimilarProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', currentProduct.category)
        .neq('id', currentProduct.id)
        .gt('stock', 0)
        .limit(4);

      if (error) throw error;
      setSimilarProducts(data || []);
    } catch (error) {
      console.error('Error fetching similar products:', error);
      // Fallback to static data
      const { products } = await import('../data/products');
      const similar = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
      setSimilarProducts(similar);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Produits similaires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Produits similaires
        </h3>
        <p className="text-gray-600">
          Découvrez d'autres produits de la catégorie "{currentProduct.category}"
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { Product } from '../types';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('stock', 0) // Only show products in stock
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to static data if database fails
      const { products: staticProducts } = await import('../data/products');
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'Tous les produits', count: products.length },
    { id: 'cheveux', label: 'Cheveux', count: products.filter(p => p.category === 'cheveux').length },
    { id: 'visage', label: 'Visage', count: products.filter(p => p.category === 'visage').length },
    { id: 'compléments', label: 'Compléments', count: products.filter(p => p.category === 'compléments').length },
    { id: 'soins', label: 'Soins', count: products.filter(p => p.category === 'soins').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'stock':
        return b.stock - a.stock;
      case 'newest':
      default:
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    }
  });

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Produits{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">
              Phares du Moment
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gluta Glow, Collagen SUPER et Collagen With Burn - Des résultats que vous allez adorer !
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    inline-flex items-center px-3 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:text-pink-600'
                    }
                  `}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort and Advanced Filters */}
            <div className="flex items-center justify-center lg:justify-end gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              >
                <option value="newest">Plus récents</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
                <option value="stock">Stock disponible</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  showFilters
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                Filtres
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres avancés</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fourchette de prix
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} XAF
                    </div>
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilité
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="ml-2 text-sm text-gray-700">En stock uniquement</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="ml-2 text-sm text-gray-700">Stock faible (moins de 10)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setPriceRange([0, 100000]);
                    setSelectedCategory('all');
                    setSortBy('newest');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Réinitialiser les filtres
                </button>
                <div className="text-sm text-gray-600">
                  {sortedProducts.length} produit(s) trouvé(s)
                </div>
              </div>
            </div>
          )}

          {/* Legacy Category Filters (hidden on mobile when advanced filters are shown) */}
          <div className={`flex flex-wrap justify-center gap-3 ${showFilters ? 'hidden lg:hidden' : ''}`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:text-pink-600'
                  }
                `}
              >
                <Filter className="h-4 w-4 mr-2" />
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Chargement des produits..." />
          </div>
        ) : sortedProducts.length > 0 ? (
          <>
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
              <span>
                {sortedProducts.length} produit(s) {searchTerm && `pour "${searchTerm}"`}
              </span>
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4" />
                <span>Trié par: {
                  sortBy === 'newest' ? 'Plus récents' :
                  sortBy === 'price-low' ? 'Prix croissant' :
                  sortBy === 'price-high' ? 'Prix décroissant' :
                  sortBy === 'name' ? 'Nom A-Z' :
                  'Stock disponible'
                }</span>
              </div>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
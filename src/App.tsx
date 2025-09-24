import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetails';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import ProductsAdmin from './components/admin/ProductsAdmin';
import OrdersAdmin from './components/admin/OrdersAdmin';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div className="min-h-screen bg-white">
                  <SEOHead />
                  <Header />
                  <main>
                    <section id="home">
                      <Hero />
                    </section>
                    <ProductCatalog />
                    <About />
                    <Testimonials />
                    <FAQ />
                    <Contact />
                  </main>
                  <Footer />
                  <Cart />
                </div>
              } />
              
              {/* Product Details Route */}
              <Route path="/product/:id" element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <ProductDetails />
                  <Footer />
                  <Cart />
                </div>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="customers" element={<div className="p-8 text-center text-gray-500">Page clients en développement</div>} />
                <Route path="settings" element={<div className="p-8 text-center text-gray-500">Page paramètres en développement</div>} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
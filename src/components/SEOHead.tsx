import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Parfait Shop and Beauty - Cosmétiques Premium au Cameroun',
  description = 'Découvrez Gluta Glow, Collagen SUPER et nos produits de beauté premium. Livraison rapide au Cameroun. Votre beauté, notre passion.',
  keywords = 'cosmétiques, beauté, Gluta Glow, collagène, Cameroun, livraison, soins visage, cheveux',
  image = 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = 'https://parfaitbeauty.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Parfait Shop and Beauty" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Parfait Shop and Beauty" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ec4899" />
      <meta name="msapplication-TileColor" content="#ec4899" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "Parfait Shop and Beauty",
          "description": description,
          "url": url,
          "logo": "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=400",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Douala",
            "addressCountry": "CM"
          },
          "telephone": "+237694165996",
          "priceRange": "$$",
          "paymentAccepted": "Mobile Money, Cash",
          "currenciesAccepted": "XAF"
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
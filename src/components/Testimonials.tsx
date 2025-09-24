import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Kamga',
      location: 'Douala',
      rating: 5,
      text: 'Gluta Glow a transformé ma peau ! Résultats visibles en 2 semaines. Je recommande vivement Parfait Beauty.',
      product: 'Gluta Glow Premium',
      image: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Fatima Ndjock',
      location: 'Yaoundé',
      rating: 5,
      text: 'Le Collagen SUPER est incroyable ! Mes cheveux sont plus forts et ma peau plus ferme. Service client excellent.',
      product: 'Collagen SUPER',
      image: 'https://images.pexels.com/photos/3735677/pexels-photo-3735677.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Grace Mballa',
      location: 'Bafoussam',
      rating: 5,
      text: 'Livraison rapide et produits authentiques. Le Collagen With Burn m\'a donné plus d\'énergie et une belle peau.',
      product: 'Collagen With Burn',
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 4,
      name: 'Sandrine Fokou',
      location: 'Douala',
      rating: 5,
      text: 'Parfait Beauty, c\'est la qualité et la confiance. Mes produits préférés pour ma routine beauté quotidienne.',
      product: 'Sérum Vitamine C',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">
              Clientes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plus de 500 femmes nous font confiance pour leur beauté au quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <Quote className="h-8 w-8 text-pink-400" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Product */}
              <div className="text-center mb-4">
                <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.product}
                </span>
              </div>

              {/* Customer Info */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-pink-200">
            <Star className="h-5 w-5 text-amber-400 fill-current mr-2" />
            <span className="font-semibold text-gray-700">4.9/5 - Plus de 500 avis positifs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
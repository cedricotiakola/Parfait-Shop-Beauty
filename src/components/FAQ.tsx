import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      id: 1,
      question: 'Comment passer une commande ?',
      answer: 'C\'est très simple ! Ajoutez vos produits au panier, remplissez vos informations de livraison, puis votre commande sera automatiquement envoyée via WhatsApp pour confirmation. Nous vous recontacterons rapidement.'
    },
    {
      id: 2,
      question: 'Quels sont les délais de livraison ?',
      answer: 'Nous livrons en 24-48h à Douala et Yaoundé, et en 2-5 jours ouvrables pour les autres villes du Cameroun. La livraison est gratuite pour les commandes de plus de 50 000 XAF.'
    },
    {
      id: 3,
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: 'Nous acceptons Mobile Money (MTN Money, Orange Money), le paiement à la livraison, et les virements bancaires. Tous nos paiements sont sécurisés.'
    },
    {
      id: 4,
      question: 'Vos produits sont-ils authentiques ?',
      answer: 'Absolument ! Nous garantissons l\'authenticité de tous nos produits. Nous travaillons uniquement avec des fournisseurs agréés et de confiance. Chaque produit est vérifié avant expédition.'
    },
    {
      id: 5,
      question: 'Puis-je retourner un produit ?',
      answer: 'Oui, vous pouvez retourner un produit dans les 7 jours suivant la réception s\'il ne vous convient pas, à condition qu\'il soit non ouvert et dans son emballage d\'origine.'
    },
    {
      id: 6,
      question: 'Comment utiliser Gluta Glow et Collagen ?',
      answer: 'Pour Gluta Glow : 1 gélule par jour avec un grand verre d\'eau, de préférence le matin. Pour Collagen : 1 sachet dilué dans 200ml d\'eau froide, à boire immédiatement. Résultats visibles en 2-4 semaines.'
    },
    {
      id: 7,
      question: 'Y a-t-il des effets secondaires ?',
      answer: 'Nos compléments sont 100% naturels et sans effets secondaires connus. Cependant, si vous êtes enceinte, allaitante ou sous traitement médical, consultez votre médecin avant utilisation.'
    },
    {
      id: 8,
      question: 'Livrez-vous dans toute l\'Afrique ?',
      answer: 'Actuellement, nous livrons uniquement au Cameroun. Nous étudions l\'extension de nos services vers d\'autres pays d\'Afrique centrale. Restez connectés pour les mises à jour !'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-pink-500" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Questions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">
              Fréquentes
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            return (
              <div 
                key={faq.id}
                className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-pink-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-pink-50 to-amber-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider ! Contactez-nous via WhatsApp pour une réponse rapide et personnalisée.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent("Bonjour ! J'ai une question concernant vos produits.");
                window.open(`https://wa.me/237694165996?text=${message}`, '_blank');
              }}
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Poser une question
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
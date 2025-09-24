import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Facebook, Twitter } from 'lucide-react';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = 'Parfait Shop and Beauty',
  description = 'Découvrez nos produits de beauté premium',
  className = ''
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      action: () => {
        const message = encodeURIComponent(`${title} - ${description} ${url}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-blue-400',
      action: () => {
        const text = encodeURIComponent(`${title} - ${description}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
      }
    },
    {
      name: 'Copier le lien',
      icon: copied ? Check : Copy,
      color: copied ? 'text-green-600' : 'text-gray-600',
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error('Failed to copy:', error);
        }
      }
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
        return;
      } catch (error) {
        // Fallback to custom menu
      }
    }
    setShowMenu(!showMenu);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Partager
      </button>

      {showMenu && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    option.action();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <option.icon className={`h-4 w-4 mr-3 ${option.color}`} />
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
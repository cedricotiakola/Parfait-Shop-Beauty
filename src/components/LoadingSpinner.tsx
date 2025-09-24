import React from 'react';
import { Heart } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Chargement...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`animate-spin rounded-full border-2 border-pink-200 ${sizeClasses[size]}`}>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-500 animate-spin"></div>
        </div>
        <Heart className={`absolute inset-0 m-auto text-pink-400 ${
          size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'
        } animate-pulse`} />
      </div>
      {text && (
        <p className={`mt-3 text-gray-600 ${
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
        }`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
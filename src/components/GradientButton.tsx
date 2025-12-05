import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function GradientButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md'
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-10 py-4 text-base',
    lg: 'px-12 py-5 text-lg'
  };

  if (variant === 'outline') {
    return (
      <button
        onClick={onClick}
        className={`bg-[#232323]/60 backdrop-blur-xl border-2 border-[#c9a227] text-[#c9a227] ${sizeClasses[size]} rounded-full hover:bg-[#232323] transition-all duration-300 relative group overflow-hidden ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_#c9a227_0%,_#d4b13f_25%,_#0e3b2c_50%,_#1a4d38_75%,_#c9a227_100%)] bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative ${sizeClasses[size]} rounded-full hover:shadow-[0_0_40px_rgba(201,162,39,0.7)] transition-all duration-300 transform hover:scale-105 group overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #c9a227 0%, #d4b13f 25%, #0e3b2c 50%, #1a4d38 75%, #c9a227 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      <span className="relative z-10 text-[#efe9d6]">{children}</span>
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, #0e3b2c 0%, #1a4d38 25%, #c9a227 50%, #d4b13f 75%, #0e3b2c 100%)',
          backgroundSize: '200% 200%',
        }}
      ></div>
    </button>
  );
}

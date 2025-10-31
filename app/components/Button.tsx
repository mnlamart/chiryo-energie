import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer';
  const variantClasses = {
    primary: 'bg-brand-header text-gray-900 hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand-hover focus:ring-offset-2',
    secondary: 'bg-brand-header text-gray-900 hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand-hover focus:ring-offset-2'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


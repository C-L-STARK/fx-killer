import React from 'react';

interface LoadingButtonProps {
  loading: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function LoadingButton({
  loading,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  children,
  className = '',
}: LoadingButtonProps) {
  const baseClasses = 'px-4 py-2 font-bold border-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white',
    secondary: 'bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white',
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

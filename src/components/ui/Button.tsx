import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "relative z-[1] inline-flex min-h-11 cursor-pointer items-center justify-center px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]";
  const variants = {
    primary: "bg-accent-red text-white hover:bg-red-800",
    secondary: "bg-navy-deep text-white hover:bg-navy-deep",
    outline: "border-2 border-primary-dark text-text-dark hover:bg-navy-deep hover:text-white"
  };
  
  const widthClass = fullWidth ? "w-full" : "w-auto";
  const styles = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

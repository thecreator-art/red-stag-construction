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
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-bold uppercase transition-all duration-300 tracking-wider text-sm";
  const variants = {
    primary: "bg-primary-red text-white hover:bg-red-800",
    secondary: "bg-primary-dark text-white hover:bg-black",
    outline: "border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white"
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

"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-full
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-secondary text-white
      hover:from-primary/90 hover:to-secondary/90
      shadow-lg hover:shadow-xl
    `,
    secondary: `
      bg-muted text-primary border border-primary/20
      hover:bg-primary/10 hover:border-primary/40
    `,
outline: `
      border-2 border-primary text-gray-700 bg-transparent
      hover:bg-gradient-to-r hover:from-primary/90 hover:to-secondary/90
      hover:text-white hover:border-transparent
      hover:scale-105 shadow-lg hover:shadow-xl
    `,
    ghost: `
      text-primary bg-transparent
      hover:bg-primary/10
    `,
    transparent: `
      bg-transparent text-black
      hover:bg-primary/90 hover:text-white
      hover:scale-105 shadow-lg hover:shadow-xl
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;

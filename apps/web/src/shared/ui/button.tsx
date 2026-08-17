import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 border border-neutral-800 dark:border-white font-extrabold',
        secondary: 'bg-dev-bg-100 text-dev-text-bright hover:bg-dev-bg-300 border border-dev-border font-semibold',
        outline: 'bg-transparent text-dev-text-bright border border-dev-border hover:bg-dev-bg-300',
        ghost: 'bg-transparent text-dev-text-muted hover:text-dev-text-bright hover:bg-dev-bg-300',
        contrast: 'bg-neutral-900 text-white dark:bg-neutral-950 dark:text-white hover:bg-neutral-800 dark:hover:bg-neutral-900 border-2 border-neutral-700 dark:border-neutral-600',
        danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 font-semibold',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-xs sm:text-sm',
        lg: 'px-5 py-2.5 text-sm sm:text-base',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
};

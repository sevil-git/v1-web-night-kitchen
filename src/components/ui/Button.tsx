import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        variant === 'primary' && 'bg-[#F3B617] text-[#272d2f] hover:bg-primary-dark',
        variant === 'secondary' && 'bg-[#F67C29] text-white hover:bg-secondary-dark',
        variant === 'ghost' && 'bg-transparent hover:bg-[#d7d7d7]/30',
        className
      )}
      {...rest}
    />
  );
}

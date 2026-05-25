import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark border border-transparent',
  secondary: 'bg-white text-primary border border-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-text-muted hover:bg-bg hover:text-text border border-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent',
  outline: 'bg-white text-text border border-border hover:border-primary hover:text-primary',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon: Icon,
      iconRight,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 font-medium transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin flex-shrink-0" />
        ) : Icon ? (
          <Icon size={14} className="flex-shrink-0" />
        ) : null}
        {children}
        {iconRight && !loading && (
          <iconRight size={14} className="flex-shrink-0" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

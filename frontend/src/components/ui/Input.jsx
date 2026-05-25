import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, icon: Icon, className = '', required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-light">
              <Icon size={16} />
            </div>
          )}
          <input
            ref={ref}
            className={`
              input-field
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

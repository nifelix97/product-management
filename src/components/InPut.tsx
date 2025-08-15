import React from 'react'


interface InPutsProps {
  label?: string;
  name?: string;
  value: string;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onSearch?: (query: any) => void;

  
}



const InPuts: React.FC<InPutsProps> = ({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  error,
  onChange,
  className = ''
}) => {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 sm:text-sm ${className}`}
        aria-invalid={!!error}
      />
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  );
}

export default InPuts;

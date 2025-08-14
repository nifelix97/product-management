import React from 'react'

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    className = '',
    type = 'button'
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2  ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {label}
        </button>
    )
}

export default Button
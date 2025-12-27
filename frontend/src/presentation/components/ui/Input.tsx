import React from 'react';
import './Input.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  rows?: number;
}

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  className = '',
  rows,
}: InputProps) {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  if (type === 'textarea') {
    return (
      <div className={`input-group ${className}`}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 4}
          className="input-field"
        />
      </div>
    );
  }

  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}


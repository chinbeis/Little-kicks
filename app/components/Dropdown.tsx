'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export default function Dropdown({ options, selectedValue, onChange, label, id }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find(option => option.value === selectedValue)?.label || options[0]?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        id={id}
        type="button"
        className="block w-full px-4 py-3 text-sm text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">{selectedLabel}</span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              className={`text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100 ${selectedValue === option.value ? 'bg-indigo-50' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              <span className={`block truncate ${selectedValue === option.value ? 'font-semibold' : 'font-normal'}`}>
                {option.label}
              </span>
              {selectedValue === option.value && (
                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

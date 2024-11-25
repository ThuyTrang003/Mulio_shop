"use client"

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean // Add disabled prop
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  className = '',
  disabled = false, // Default to false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null)

  const handleToggle = () => {
    if (!disabled) { // Only toggle if not disabled
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (option: SelectOption) => {
    if (!disabled) { // Only select if not disabled
      setSelectedOption(option)
      setIsOpen(false)
      if (onChange) {
        onChange(option.value)
      }
    }
  }

  return (
    <div className={`relative inline-block text-left w-full ${className}`}>
      <div>
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50  focus:outline-none focus:ring-[#B88E2F] focus:border-[#B88E2F]"
          aria-haspopup="true"
          aria-expanded="true"
          disabled={disabled} // Disable button when disabled prop is true
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full max-h-60 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                disabled={disabled} // Disable option selection if disabled
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Select

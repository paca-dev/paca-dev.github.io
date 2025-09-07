import React from 'react';
import { Filter, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const FilterToggleButton: React.FC<Props> = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    aria-expanded={isOpen}
    aria-controls="filters-panel"
    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 text-gray-600"
    title="Toggle filters"
  >
    {isOpen ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
  </button>
);

export default FilterToggleButton;

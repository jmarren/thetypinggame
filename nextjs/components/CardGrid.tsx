import React from 'react';

interface CardGridProps {
  items: string[];
  toggleSelect: (char: string) => void;
  selected: string[];
}

const CardGrid: React.FC<CardGridProps> = ({ items, toggleSelect, selected }) => {
  return (
    <div className='grid grid-cols-3 gap-4 overflow-y-scroll max-h-64 text-sky-600 bg-blue-100 text-center mt-10 p-6'>
      {items.map((char, index) => (
        <div
          onClick={() => toggleSelect(char)}
          key={index}
          className={selected.includes(char) ? 'p-6 bg-yellow-200 rounded shadow border-2 border-white cursor-pointer hover:bg-slate-300 flex items-center scale-105' : 'p-6 bg-slate-100 rounded shadow cursor-pointer hover:bg-slate-300 flex items-center'}
        >
          <span className='w-full text-center font-[courier]'>
            {char}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;

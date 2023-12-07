import React from 'react';

const BurgerButton: React.FC<{toggleNav:()=>void}> = ({toggleNav}) => {
  return (
    <button className="flex flex-col justify-between h-[30px] w-[30px] " onClick={toggleNav}>
      <div className="w-full h-[5px] rounded-full bg-blue-600"></div>
      <div className="w-full h-[5px] rounded-full bg-blue-600"></div>
      <div className="w-full h-[5px] rounded-full bg-blue-600"></div>
    </button>
  );
};

export default BurgerButton;

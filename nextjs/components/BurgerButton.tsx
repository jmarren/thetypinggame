import React from 'react';

const BurgerButton: React.FC<{toggleNav:()=>void, navOpen: boolean}> = ({toggleNav, navOpen}) => {
  return (
    <button className="flex flex-col justify-between h-[30px] w-[30px] scale-[0.75]" onClick={toggleNav}>
      <div className={navOpen ? "w-full h-[5px] rounded-full bg-blue-600 transform rotate-45  translate-y-[12.5px]  transition transition-all duration-[0.75s]" : "w-full h-[5px] rounded-full bg-blue-600"}></div>
      <div className={navOpen ? "hidden" : "w-full h-[5px] rounded-full bg-blue-600"}></div>
      <div className={navOpen ? "w-full h-[5px] rounded-full bg-blue-600 transform -rotate-45 -translate-y-[12.5px] transition transition-all duration-[0.75s] " : "w-full h-[5px] rounded-full bg-blue-600"}></div>
    </button>
  );
};

export default BurgerButton;

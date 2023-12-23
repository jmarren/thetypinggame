import React from 'react';

const XButton: React.FC<{toggleModal: () => void}> = ({toggleModal}) => {
    return (
        <button className="flex items-center justify-center h-[20px] w-[20px] group " onClick={toggleModal}>
            <div className="absolute w-full h-[3px] rounded-full bg-white transform rotate-45 group-hover:bg-slate-200 group-hover:scale-90"></div>
            <div className="absolute w-full h-[3px] rounded-full bg-white transform -rotate-45 group-hover:bg-slate-200 group-hover:scale-90"></div>
        </button>
    );
};

export default XButton;
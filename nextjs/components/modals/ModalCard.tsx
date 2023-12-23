import React from 'react';
import XButton from '../XButton';

interface ModalCardProps {
    children: React.ReactNode;
    toggleModal: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({ children, toggleModal }) => {
    return (
        <div className='w-[50%] min-w-[500px] shadow-2xl bg-blue-400 rounded-md p-10 flex font-[Sora] text-white flex flex-col relative' onClick={(e) => e.stopPropagation()}>
       <div className='absolute top-4 right-4'> 
        <XButton toggleModal={toggleModal} />
        </div>
            {children}
        </div>
    );
};

export default ModalCard;

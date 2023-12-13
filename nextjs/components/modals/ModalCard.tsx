import React from 'react';

interface ModalCardProps {
    children: React.ReactNode;
}

const ModalCard: React.FC<ModalCardProps> = ({ children }) => {
    return (
        <div className='w-[50%] shadow-2xl bg-blue-400 rounded-md absolute p-10 flex font-[Sora] text-white flex flex-col '>
            {children}
        </div>
    );
};

export default ModalCard;
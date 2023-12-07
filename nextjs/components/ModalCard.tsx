import React from 'react';

interface ModalCardProps {
    children: React.ReactNode;
}

const ModalCard: React.FC<ModalCardProps> = ({ children }) => {
    return (
        // min-w-[400px] min-h-[500px
<div className="bg-blue-400 p-2 rounded-lg shadow-2xl text-white font-[Sora]">
            {children}
        </div>
    );
};

export default ModalCard;

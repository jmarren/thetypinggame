import React from "react";

type CardProps = {
    // width: string;
    // height: string;
    children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div
            className="bg-sky-600 rounded-lg  border-[0.1px] border-white max-w-[40rem]"
            style={{
                boxShadow: "1px -0.5px 10px 0px white inset, -2px 2px 0px 1px white",
            }}
        >
            {children}
        </div>
    );
};

export default Card;

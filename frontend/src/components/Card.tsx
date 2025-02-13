import React from 'react'
import Button from '@/components/Button';
import Image from "next/image";
import CardDecoration from '@/Decoration/cardDecoration';


interface TableRowProps {
    Decoration: () => React.JSX.Element;
    description: string;
    buttonText: string;
}

const Card: React.FC<TableRowProps> = ({ Decoration, description, buttonText }) => {
    return (
        <div className="bg-blue-600 relative h-[265px] flex flex-col justify-between max-xl:flex-grow items-start text-white p-6 rounded-lg">
            <Decoration />
            <h2 className="text-lg w-[149px]">{description}</h2>
            <Button size={"md"} variant={"tranparent"} className="bg-white/20 rounded-lg">
                {buttonText}
            </Button>


        </div>
    )
}

export default Card
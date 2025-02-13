import React from 'react'

type props = {
    title: string,
    subtitle: string,
}
const Header: React.FC<props> = ({ title, subtitle }) => {
    return (
        <div>
            <h1 className="text-lg-custom text-black font-bold">{title}</h1>
            <p className="text-base-custom text-muted">{subtitle}</p>
        </div>
    );
};

export default Header;

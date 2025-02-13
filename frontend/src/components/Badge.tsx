import React from "react";

interface BadgeProps {
    level: string;
}

const levelColors: Record<string, string> = {
    "Warga": "text-sunset bg-sunset/10",
    "Juragan": "text-ocean bg-ocean/10",
    "Sultan": "text-mint bg-mint/10",
    "Konglomerat": "text-purple bg-purple/10",
};

const Badge: React.FC<BadgeProps> = ({ level }) => {
    return (
        <span className={`px-3 py-1 rounded-md text-sm font-semibold ${levelColors[level] || "bg-gray-100 text-gray-600"}`}>
            {level}
        </span>
    );
};

export default Badge;

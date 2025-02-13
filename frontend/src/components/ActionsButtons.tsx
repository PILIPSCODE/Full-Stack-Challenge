import React from "react";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import Button from "./Button";

interface ActionButtonProps {
    onDetail?: () => void;
    onEdit?: () => void;
    onDelete?: (index: number) => void;
    showLabels?: boolean;
    index: number;
}

const ActionButtons: React.FC<ActionButtonProps> = ({ onDetail, onEdit, onDelete, showLabels = true, index }) => {
    return (
        <div className="flex gap-2 text-background">
            <Button variant="action" className="flex gap-2 items-center" onClick={onDetail}>
                <FaInfoCircle /> {showLabels && "Detail"}
            </Button>
            <Button variant="action" onClick={onEdit}>
                <FaEdit />
            </Button>
            <Button variant="action" className="text-red-500" onClick={() => onDelete?.(index)}>
                <FaTrash />
            </Button>
        </div>
    );
};

export default ActionButtons;

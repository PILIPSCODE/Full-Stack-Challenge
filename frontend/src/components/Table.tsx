"use client";
import React, { useEffect, useState } from "react";
import ActionButtons from "./ActionsButtons";
import { CgScrollV } from "react-icons/cg";
import Badge from "./Badge";

interface TableProps {
    columns: { key: string; label: string; isMobileVisible?: boolean }[];
    data: any[];
    onDetail?: (id: number) => void;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const DataTable: React.FC<TableProps> = ({ columns, data, onDetail, onEdit, onDelete }) => {
    const [clientData, setClientData] = useState<any[]>([]);

    // Menghindari perbedaan data antara SSR & CSR
    useEffect(() => {
        setClientData(data);
    }, [data]);

    return (
        <div className="overflow-x-auto bg-white max-h-96 rounded-lg mt-3">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-muted text-base-custom font-semibold">
                        {columns.map((col) => (
                            <th key={col.key} className={`p-3 relative  text-left ${col.isMobileVisible ? "" : "hidden md:table-cell"}`}>
                                {col.label}
                                <CgScrollV className="absolute right-3 top-1/3 " />
                            </th>
                        ))}
                        <th className="p-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clientData.length > 0 ? (
                        clientData.slice(0, 10).map((item, index) => (
                            <tr key={index} className="text-background font-semibold text-base-custom">
                                {columns.map((col) => (
                                    <td key={col.key} className={`p-[10px] ${col.isMobileVisible ? "" : "hidden md:table-cell"}`}>
                                        {col.key === "level" ? <Badge level={item[col.key]} /> : item[col.key]}
                                    </td>
                                ))}
                                <td className="p-[10px]">
                                    <ActionButtons
                                        onDetail={onDetail ? () => onDetail(item.id) : undefined}
                                        onEdit={onEdit ? () => onEdit(item.id) : undefined}
                                        onDelete={onDelete ? () => onDelete(item.id) : undefined}
                                        index={index}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center text-black p-4">
                                Tidak ada Data Disini, Tambahkan terlebih dahulu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

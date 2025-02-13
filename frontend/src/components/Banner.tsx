import React from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { FaFilter } from "react-icons/fa";
import { TfiReload, TfiPrinter } from "react-icons/tfi";
import Link from "next/link";

interface Props {
    title: string;
    subtitle: string;
    backgroundImage?: string;
}

const Banner = ({ title, subtitle }: Props) => {
    const buttons = [
        { label: "Filter", icon: <FaFilter /> },
        { label: "Refresh", icon: <TfiReload /> },
        { label: "", icon: <TfiPrinter /> },
    ];

    return (
        <div className="relative bg-primary text-white p-4 rounded-lg md:p-6">
            <div className="relative z-30">
                <h1 className="text-xl-custom md:text-2xl font-bold mb-1">{title}</h1>
                <p className="text-sm-custom opacity-90 leading-[20px] max-w-xs md:max-w-md">{subtitle}</p>

                <div className="flex flex-col md:flex-row gap-3 mt-4">
                    <Link href={"/Admin/customer/add"}>
                        <Button
                            variant="tranparent"
                            className="bg-white/20 rounded-md flex items-center gap-2 px-4 py-2 text-sm-custom md:text-base-custom"
                        >
                            <span className="text-lg-custom">+</span> Add Customer
                        </Button>
                    </Link>
                    <SearchBar />
                    <div className="flex gap-2 md:gap-3">
                        {buttons.map((btn, index) => (
                            <Button
                                key={index}
                                variant="tranparent"
                                className="bg-white/20 rounded-md flex items-center gap-2 px-3 py-2 text-sm-custom md:text-base-custom"
                            >
                                {btn.icon} {btn.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="absolute h-full top-0 right-0 w-1/2 hidden md:block"
                style={{
                    clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
                    backgroundImage: "url('/banner-bg.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute max-xl:hidden inset-0 bg-black/30"></div>
                <div
                    className="absolute h-full top-0 right-0 w-full"
                    style={{
                        clipPath: "polygon(22% 0, 23% 0, 1% 100%, 0% 100%)",
                        backgroundColor: "white",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Banner;

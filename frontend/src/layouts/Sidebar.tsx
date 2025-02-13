"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserFriends } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { PiBatteryFullLight, PiCallBellThin, PiUserSquareLight, PiShoppingCartSimpleThin, PiClipboardLight, PiTruck } from "react-icons/pi";
import { LuSquareMousePointer } from "react-icons/lu";
import { MdOutlineCandlestickChart } from "react-icons/md";
import { IoLogOut, IoMenu } from "react-icons/io5";
import Button from '@/components/Button';
import { usePathname } from "next/navigation";


const menuItems = [
    { name: 'Dashboard', icon: <LuSquareMousePointer />, link: '/Admin', active: false, notification: 2 },
    { name: 'Stock', icon: <PiBatteryFullLight />, link: '/Admin/stock', active: false, notification: 0 },
    { name: 'Customer', icon: <FaUserFriends />, link: '/Admin/customer', active: true, notification: 0 },
    { name: 'Design', icon: <TbCategory2 />, link: '/Admin/design', active: false, notification: 0 },
    { name: 'Restaurant', icon: <PiCallBellThin />, link: '/Admin/restaurant', active: false, notification: 0 },
    { name: 'Report', icon: <PiClipboardLight />, link: '/Admin/report', active: false, notification: 0 },
    { name: 'Role Admin', icon: <PiUserSquareLight />, link: '/Admin/role-admin', active: false, notification: 0 },
    { name: 'Settings', icon: <MdOutlineCandlestickChart />, link: '/Admin/settings', active: false, notification: 0 },
];

const integrationItems = [
    { name: 'Stock', icon: <PiShoppingCartSimpleThin />, link: '/integration/stock', active: false, notification: 0 },
    { name: 'Supply', icon: <PiTruck />, link: '/integration/supply', active: false, notification: 0 },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();


    return (
        <>
            {/* Toggle Button (Mobile) */}
            <button
                className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-md xl:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IoMenu size={24} />
            </button>

            {/* Sidebar */}
            <section
                id='sidebar'
                className={`w-[200px] p-5 bg-foreground z-50 h-screen gap-7 border-r-muteddark border flex flex-col fixed top-0 left-0 transition-transform duration-300 xl:static 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
            >
                <div className='flex items-start gap-1'>
                    <Image src='/logo.png' alt='kiwo' width={22} height={12} />
                    <h1 className='text-primary text-xl-custom font-bold'>Square</h1>
                </div>

                <div className='text-muted font-semibold'>
                    <p className='text-xs-custom'>Menu</p>
                    <ul className='flex flex-col gap-4 mt-3 text-base-custom'>
                        {menuItems.map((item, index) => (
                            <li key={index} className={`${item.link === pathname ? "text-primary" : ""} flex justify-between items-center gap-2`}>
                                <Link href={item.link} className='flex items-center gap-4'>
                                    {item.icon} {item.name}
                                </Link>
                                <p className={`h-4 w-4 rounded-full text-sm-custom flex justify-center items-center text-white bg-highlight ${item.notification === 0 ? "hidden" : ""}`}>{item.notification}</p>

                            </li>
                        ))}
                    </ul>
                </div>

                <div className='text-muted font-semibold'>
                    <p className='text-xs-custom'>Integration</p>
                    <ul className='flex flex-col gap-4 mt-3 text-base-custom'>
                        {integrationItems.map((item, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <Link href={item.link} className='flex items-center gap-4'>
                                    {item.icon} {item.name}
                                </Link>
                                <p className={`h-4 w-4 rounded-full text-sm-custom flex justify-center items-center text-white bg-highlight ${item.notification === 0 ? "hidden" : ""}`}>{item.notification}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='absolute bottom-0 p-6 h-36 w-full left-0 font-semibold border-t-muteddark border'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-8 w-8 relative bg-pink-300 overflow-hidden rounded-full'>
                            <Image src='/pp.png' alt='kiwo' fill className='object-contain' />
                        </div>
                        <div>
                            <h2 className='text-background text-sm-custom'>Savannah N</h2>
                            <p className='text-muted text-xs-custom'>Food Quality Manager</p>
                        </div>
                    </div>
                    <Button variant={"tranparent"} size={"sm"} className='bg-red-300/20 w-full mt-7 flex justify-center items-center gap-2 text-redcustom'>
                        <IoLogOut className='rotate-180' />
                        Logout
                    </Button>
                </div>
            </section>

            {/* Overlay (untuk menutup sidebar saat diklik di luar) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 xl:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;

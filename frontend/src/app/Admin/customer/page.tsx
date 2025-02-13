"use client"
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import TopMenu from '@/components/TopMenu';
import Card from '@/components/Card';
import CardDecoration from '@/Decoration/cardDecoration';
import PaginationBar from '@/components/PaginationBar';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/Table';

let topMenuItems = ["Nasi Goreng Jamur Special Resto Pak Min",
    "Tongseng Sapi Gurih",
    "Nasi Gudeg Telur Ceker",
    "Nasi Ayam Serundeng",
    "Nasi Goreng Seafood"]
export default function CustomerPage() {
    const [customers, setCustomer] = useState([])
    const router = useRouter()

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/customers/${id}`)
            setCustomer((prevCustomers) => prevCustomers.filter((customer: any) => customer.id !== id));
        } catch (error) {
            console.log(error)
        }

    }
    const handleDetail = (id: number) => {
        router.push(`/Admin/customer/${id}`)
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/customers")
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((err) => {
                console.log("Gagal mengambil data produk");
            });
    }, []);


    return (
        <div className="flex flex-col p-5 max-xl:mt-5 gap-6 xl:overflow-hidden  h-screen">
            <div className='grid grid-cols-2 max-md:grid-cols-1'>
                <Header title='Customer' subtitle='You can manage and organize your customer and other things here' />
                <Navbar />
            </div>

            <div className="flex gap-6 max-xl:flex-col max-lg:flex-grow-0 flex-grow">
                <div className="flex-grow relative flex flex-col gap-3 bg-white  h-full rounded-lg overflow-auto">
                    <Banner title='Customer' subtitle='On this menu you will be able to create, edit, and also delete the customer. Also you can manage it easily.' backgroundImage='/banner-bg.jpeg' />
                    <DataTable columns={[
                        { key: "name", label: "Customer Name", isMobileVisible: true },
                        { key: "level", label: "Level" },
                        { key: "favorite_menu", label: "Favorite Menu" },
                        { key: "total_transaction", label: "Total Transaction" },
                    ]}
                        data={customers}
                        onDetail={handleDetail}
                        onDelete={handleDelete}
                    />
                    <PaginationBar />
                </div>

                <div className="w-[227px] flex flex-col gap-3 max-xl:flex-row max-md:flex-col max-xl:w-full">
                    <Card Decoration={CardDecoration} description='See analytics of the Customer Clearly' buttonText='See Analytics' />
                    <TopMenu items={topMenuItems} title='Top Menu This Week' dateRange='10 - 12 Agustus 2023' />

                </div>
            </div>
        </div>
    );
}


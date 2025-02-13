"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

type CustomerForm = {
    name: string;
    level: string;
    favorite_menu: string;
    total_transaction: number;
};

export default function page() {
    const { register, handleSubmit, reset } = useForm<CustomerForm>();
    const [products, setProducts] = useState([]);


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const route = useRouter()

    const onSubmit = async (data: CustomerForm) => {
        try {
            setLoading(true);
            setMessage("");

            await axios.post("http://localhost:8080/api/customers", data);
            setMessage("✅ Customer added successfully!");
            route.push("/Admin/customer");
            reset();
        } catch (error) {
            setMessage("❌ Failed to add customer.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/products")
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((err) => {
                console.log("Gagal mengambil data produk");
            });
    }, []);

    return (
        <div className="max-w-md text-background mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Customer</h2>
            {message && <p className="text-center text-sm mb-4">{message}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full p-2 border rounded"
                        placeholder="Customer Name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Level</label>
                    <select {...register("level", { required: true })} className="w-full p-2 border rounded">
                        <option value="Warga">Warga</option>
                        <option value="Juragan">Juragan</option>
                        <option value="Sultan">Sultan</option>
                        <option value="Konglomerat">Konglomerat</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Favorite Menu</label>
                    <select {...register("favorite_menu", { required: true })} className="w-full p-2 border rounded">
                        {products?.map((e: any, index) => (
                            <option key={index} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Total Transaction (IDR)</label>
                    <input
                        type="number"
                        {...register("total_transaction", { required: true, valueAsNumber: true })}
                        className="w-full p-2 border rounded"
                        value={0}
                        placeholder="Total Transaction"
                    />
                </div>

                <Button
                    type="submit"
                    variant={"primary"}
                    className="text-white w-full"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Add Customer"}
                </Button>
            </form>
        </div>
    );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCustomer, incrementQuantity, decrementQuantity } from "@/redux/feature/customerSlice";
import Button from "@/components/Button";

export default function CustomerDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const customer = useSelector((state: RootState) => state.customer.customer);

    useEffect(() => {
        dispatch(fetchCustomer(String(params.id)));
    }, [params.id, dispatch]);

    if (!customer) {
        return <p className="text-center text-white mt-5">Loading...</p>;
    }

    return (
        <div className="min-h-screen  bg-foreground text-foreground p-6">
            <div className="max-w-2xl my-auto mx-auto bg-primary p-6 rounded-2xl shadow-lg">
                <h1 className="text-xl font-bold text-center mb-4">Customer Details</h1>
                <p className="text-lg font-semibold">ID: {customer.customer_id}</p>
                <p className="text-lg">Nama: {customer.customer_name}</p>
                <p className="text-lg">Level: {customer.level}</p>
                <p className="text-lg">Menu Favorit: {customer.favorite_menu}</p>
                <p className="text-lg font-bold">Total Transaksi: Rp {customer.total_transaction.toLocaleString()}</p>

                <h2 className="text-xl font-semibold mt-6">Produk yang Dipesan</h2>
                {customer.products.length > 0 ? (
                    <div className="space-y-4 mt-2">
                        {customer.products.map((product) => (
                            <div
                                key={product.product_id}
                                className="flex justify-between items-center bg-secondary p-4 rounded-lg shadow-md"
                            >
                                <div>
                                    <p className="text-lg font-semibold">{product.product_name}</p>
                                    <p className="text-sm">Harga: Rp {product.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <Button
                                        variant={"action"}
                                        className="text-black rounded-md"
                                        onClick={() => dispatch(decrementQuantity(product.product_id))}
                                    >
                                        −
                                    </Button>
                                    <span className="mx-3 text-lg">{product.quantity}</span>
                                    <Button
                                        variant={"action"}
                                        className="text-black  rounded-md"
                                        onClick={() => dispatch(incrementQuantity(product.product_id))}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-4 text-background">Belum ada produk yang dipesan.</p>
                )}
            </div>
        </div>
    );
}

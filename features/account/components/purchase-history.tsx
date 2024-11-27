import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetCartHistory } from "@/hooks/user-hook/use-purchased";

import { useAuthStore } from "@/stores/auth";

import { moneyFormatter } from "@/utils/money-formatter";

// Define interfaces for Product and Order
interface Product {
    productId: string;
    productName: string;
    image: string[];
    size: string;
    color: string;
    amount: number;
    price: number;
    totalPrice: number;
}

interface Order {
    orderId: string;
    orderDate: string;
    totalPrice: number;
    orderProduct: Product[];
}

export default function PurchaseHistory() {
    const router = useRouter();
    const { token } = useAuthStore();
    const { data, isLoading, isError } = useGetCartHistory();

    // Define state variables for orders and products
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    useEffect(() => {
        if (data) {
            setOrders(data.content); // Set orders data
            // Flatten products from all orders and set them in state
            const allProducts = data.content.flatMap(
                (order: Order) => order.orderProduct,
            );
            setProducts(allProducts); // Set all products data
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="py-6 text-center">
                Loading your purchase history...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-6 text-center text-red-500">
                Failed to load purchase history.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-bold">Your Purchase History</h1>
            {orders.length === 0 ? (
                <div className="py-6 text-center">You have no orders yet.</div>
            ) : (
                orders.map((order: Order) => (
                    <div
                        key={order.orderId}
                        className="mb-8 rounded-lg border bg-white p-4 shadow-md"
                    >
                        <h2 className="mb-4 text-xl font-semibold">
                            Order ID: {order.orderId}
                        </h2>
                        <p className="mb-2 text-gray-600">
                            Order Date:{" "}
                            {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        <p className="mb-4 text-gray-600">
                            Total Price: {moneyFormatter(order.totalPrice)}
                        </p>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {order.orderProduct.map((product: Product) => (
                                <div
                                    key={product.productId}
                                    className="rounded-lg border bg-gray-50 p-4 shadow-sm"
                                >
                                    <img
                                        src={product.image[0]}
                                        alt={product.productName}
                                        className="mb-2 h-32 w-full rounded object-cover"
                                    />
                                    <h3 className="text-lg font-medium">
                                        {product.productName}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {product.size} - {product.color}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {product.amount}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Price: {moneyFormatter(product.price)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Total:{" "}
                                        {moneyFormatter(product.totalPrice)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

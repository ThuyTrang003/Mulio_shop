"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useGetCart } from "@/hooks/cart-hook/use-cart";

import { useAuthStore } from "@/stores/auth";

import { moneyFormatter } from "@/utils/money-formatter";

import { CartItem } from "@/features/cart/types/cart-item-type";
import PageHeader from "@/features/layout/page-header";

import Select from "@/components/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Location {
    code: number;
    name: string;
}

interface Customer {
    data: {
        fullName: string;
        phone: string;
        address: string;
    };
}

export default function CheckoutPage() {
    const router = useRouter(); 
    const { token } = useAuthStore();
    const accessToken = token.accessToken;
    const [provinces, setProvinces] = useState<Location[]>([]);
    const [districts, setDistricts] = useState<Location[]>([]);
    const [wards, setWards] = useState<Location[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedWard, setSelectedWard] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // Get cart data
    const { data: cartData } = useGetCart();
    console.log("cartData", cartData);

    useEffect(() => {
        if (token)
            if (token.accessToken === "") {
                redirect("/signin"); // Chuyển hướng nếu đã login
            }
    }, [token]);
    useEffect(() => {
        fetch("http://localhost:8080/api/users/customer-info", {
            method: "GET", // Ensure the method is GET
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`, // Add the access token here
            },
        })
            .then((response) => {
                if (!response.ok) {
                    // Handle unauthorized or other errors
                    if (response.status === 401) {
                        console.error(
                            "Unauthorized access - please login again.",
                        );
                        // Optionally, redirect to login page
                        // window.location.href = '/login';
                    } else {
                        console.error(
                            "Failed to fetch customer data:",
                            response.status,
                        );
                    }
                    return Promise.reject("Unauthorized access");
                }
                console.log("response", response);
                return response.json();
            })
            .then((data) => {
                console.log("Customer Data:", data);
                setCustomer(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching customer data:", error);
                setLoading(false);
            });
    }, [accessToken]);
    console.log("customer", customer?.data.address);

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then((response) => response.json())
            .then((data) => setProvinces(data))
            .catch((error) =>
                console.error("Error fetching provinces:", error),
            );
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetch(
                `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`,
            )
                .then((response) => response.json())
                .then((data) => setDistricts(data.districts || []))
                .catch((error) =>
                    console.error("Error fetching districts:", error),
                );
        } else {
            setDistricts([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch(
                `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`,
            )
                .then((response) => response.json())
                .then((data) => setWards(data.wards || []))
                .catch((error) =>
                    console.error("Error fetching wards:", error),
                );
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);
    // Hàm tìm tên từ code
    const findNameByCode = (list: Location[], code: string): string => {
        const location = list.find((item) => item.code.toString() === code);
        return location ? location.name : "";
    };

    const handleCheckout = async () => {
        if (!cartData?.cartId) {
            // console.error("Cart ID is missing.");
            toast.error("Không tìm thấy giỏ hàng!");
            return;
        }

        const checkoutEndpoint = `http://localhost:8080/api/cart/${cartData.cartId}/checkout`;

        // Chuyển đổi mã thành tên
        const cityName = findNameByCode(provinces, selectedProvince);
        const districtName = findNameByCode(districts, selectedDistrict);
        const wardName = findNameByCode(wards, selectedWard);

        const paymentData = {
            fullName: customer?.data.fullName || "",
            phone: customer?.data.phone || "",
            address: customer?.data.address || "",
            city: cityName,
            district: districtName,
            ward: wardName,
            paymentMethod:
                paymentMethod === "Thanh toán khi nhận hàng"
                    ? "Thanh toán khi nhận hàng"
                    : "Chuyển khoản ngân hàng",
        };

        try {
            const response = await fetch(checkoutEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Thanh toán thành công!");
                console.log("Checkout success:", data);
                // alert("Thanh toán thành công!");
                router.push("/shop");
            } else {
                const errorData = await response.json();
                toast.error(
                    errorData?.message || "Thanh toán thất bại. Vui lòng thử lại!"
                );
                console.error("Checkout failed:", errorData);
                // alert("Thanh toán thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
            console.error("Error during checkout:", error);
            // alert("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Thanh toán"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Thanh toán", href: "/checkout" },
                ]}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Left Column: Billing Details */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Chi tiết thanh toán
                        </h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Họ tên
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#B88E2F] focus:outline-none focus:ring-[#B88E2F] sm:text-sm"
                                placeholder="Nhập họ tên"
                                value={customer?.data.fullName || ""}
                                onChange={(e) =>
                                    setCustomer((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  data: {
                                                      ...prev.data,
                                                      fullName: e.target.value,
                                                  },
                                              }
                                            : null,
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#B88E2F] focus:outline-none focus:ring-[#B88E2F] sm:text-sm"
                                placeholder="Nhập số điện thoại"
                                value={customer?.data.phone || ""}
                                onChange={(e) =>
                                    setCustomer((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  data: {
                                                      ...prev.data,
                                                      phone: e.target.value,
                                                  },
                                              }
                                            : null,
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#B88E2F] focus:outline-none focus:ring-[#B88E2F] sm:text-sm"
                                placeholder="Nhập địa chỉ"
                                value={customer?.data.address || ""}
                                onChange={(e) =>
                                    setCustomer((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  data: {
                                                      ...prev.data,
                                                      address: e.target.value,
                                                  },
                                              }
                                            : null,
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tỉnh/Thành phố
                            </label>
                            <Select
                                options={provinces.map((province) => ({
                                    value: province.code.toString(),
                                    label: province.name,
                                }))}
                                placeholder="Chọn Tỉnh/Thành phố"
                                onChange={(value) => setSelectedProvince(value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Quận/Huyện
                            </label>
                            <Select
                                options={districts.map((district) => ({
                                    value: district.code.toString(),
                                    label: district.name,
                                }))}
                                placeholder="Chọn Quận/Huyện"
                                onChange={(value) => setSelectedDistrict(value)}
                                className="mt-1"
                                disabled={!selectedProvince}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phường/Xã
                            </label>
                            <Select
                                options={wards.map((ward) => ({
                                    value: ward.code.toString(),
                                    label: ward.name,
                                }))}
                                placeholder="Chọn Phường/Xã"
                                onChange={(value) => setSelectedWard(value)}
                                className="mt-1"
                                disabled={!selectedDistrict}
                            />
                        </div>
                    </div>

                    {/* Right Column: Cart Items */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Giỏ hàng của bạn
                        </h2>
                        <div>
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                                    <tr>
                                        <th scope="col" className="px-4 py-2">
                                            Sản phẩm
                                        </th>
                                        <th scope="col" className="px-4 py-2">
                                            Số lượng
                                        </th>
                                        <th scope="col" className="px-4 py-2">
                                            Màu sắc
                                        </th>
                                        <th scope="col" className="px-4 py-2">
                                            Kích thước
                                        </th>
                                        <th scope="col" className="px-4 py-2">
                                            Thành tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Render dynamic product rows */}
                                    {cartData &&
                                    cartData.products.length > 0 ? (
                                        cartData.products.map(
                                            (item: CartItem) => (
                                                <tr key={item.productId}>
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                                                <Image
                                                                    src={
                                                                        item
                                                                            .image[0]
                                                                    }
                                                                    alt={
                                                                        item.productName
                                                                    }
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <span>
                                                                {
                                                                    item.productName
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {item.amount}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {item.color}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {item.size}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {moneyFormatter(
                                                            item.price,
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-2 text-center"
                                            >
                                                Không có sản phẩm trong giỏ
                                                hàng.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Tổng cộng:</span>
                            <span className="text-lg text-[#B88E2F]">
                                {cartData && cartData.totalPrice
                                    ? moneyFormatter(cartData.totalPrice)
                                    : moneyFormatter(0)}
                            </span>
                        </div>
                        <hr className="my-4 border-gray-300" />

                        {/* Payment Methods */}
                        <div>
                            <h3 className="font-semibold">
                                Chọn phương thức thanh toán
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        onChange={() =>
                                            setPaymentMethod(
                                                "Thanh toán khi nhận hàng",
                                            )
                                        }
                                        checked={
                                            paymentMethod ===
                                            "Thanh toán khi nhận hàng"
                                        }
                                        className="mr-2"
                                    />
                                    Thanh toán khi nhận hàng
                                </label>
                                {paymentMethod ===
                                    "Thanh toán khi nhận hàng" && (
                                    <p className="mt-2 pl-5 text-sm text-gray-500">
                                        Thanh toán tiền mặt cho người giao hàng
                                        khi nhận sản phẩm. Đây là cách đơn giản
                                        và an toàn, giúp bạn kiểm tra sản phẩm
                                        trước khi thanh toán.
                                    </p>
                                )}

                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="BankTransfer"
                                        onChange={() =>
                                            setPaymentMethod(
                                                "Chuyển khoản ngân hàng",
                                            )
                                        }
                                        checked={
                                            paymentMethod ===
                                            "Chuyển khoản ngân hàng"
                                        }
                                        className="mr-2"
                                    />
                                    Chuyển khoản ngân hàng
                                </label>
                                {paymentMethod === "Chuyển khoản ngân hàng" && (
                                    <p className="mt-2 pl-5 text-sm text-gray-500">
                                        Chuyển khoản vào tài khoản ngân hàng của
                                        cửa hàng trước khi nhận sản phẩm. Phương
                                        thức này giúp bạn thanh toán nhanh chóng
                                        và tiện lợi.
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            className="w-full rounded-full bg-[#B88E2F] py-2 font-semibold text-white hover:bg-[#C6A559] focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-opacity-50"
                            onClick={handleCheckout}
                        >
                            Xác nhận đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

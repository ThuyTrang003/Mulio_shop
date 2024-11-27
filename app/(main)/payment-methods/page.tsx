"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

import PageHeader from "@/features/layout/page-header";

import { Button } from "@/components/ui/button";

const PaymentPolicyPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., sending the message to an API)
        console.log("Form submitted", formData);
    };

    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Phương thức thanh toán"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Phương thức thanh toán", href: "/payment-policy" },
                ]}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-4xl font-semibold">
                        Phương thức thanh toán
                    </h2>
                    <p className="mb-8 text-center text-justify">
                        Chúng tôi cung cấp hai phương thức thanh toán chính cho khách hàng:
                    </p>
                    <h3 className="mb-4 text-2xl font-semibold">1. Thanh toán khi nhận hàng (COD)</h3>
                    <p className="mb-8 text-center text-justify">
                        Phương thức thanh toán khi nhận hàng (COD) cho phép bạn thanh toán trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm. Phương thức này phù hợp cho những khách hàng muốn kiểm tra sản phẩm trước khi thanh toán. Sau khi đơn hàng được xác nhận, chúng tôi sẽ tiến hành giao hàng tới địa chỉ của bạn và bạn có thể thanh toán trực tiếp khi nhận hàng.
                    </p>
                    <h3 className="mb-4 text-2xl font-semibold">2. Thanh toán qua ngân hàng</h3>
                    <p className="mb-8 text-center text-justify">
                        Ngoài phương thức thanh toán khi nhận hàng, chúng tôi cũng cung cấp thanh toán qua ngân hàng để thuận tiện cho khách hàng. Bạn có thể chuyển khoản trực tiếp qua các tài khoản ngân hàng của chúng tôi. Sau khi thanh toán thành công, vui lòng cung cấp mã giao dịch hoặc xác nhận thanh toán để chúng tôi tiến hành giao hàng.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        Dưới đây là thông tin tài khoản ngân hàng của chúng tôi:
                    </p>
                    <ul className="mb-8 text-center">
                        <li><strong>Ngân hàng: </strong>Ngân hàng ABC</li>
                        <li><strong>Chủ tài khoản: </strong>Công ty Mulio</li>
                        <li><strong>Số tài khoản: </strong>1234567890</li>
                        <li><strong>Chi nhánh: </strong>Chi nhánh TP.HCM</li>
                    </ul>
                    <p className="mb-4 text-center text-justify">
                        Nếu bạn gặp bất kỳ vấn đề gì trong quá trình thanh toán, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc email để được hỗ trợ.
                    </p>
                    <h3 className="mb-4 text-2xl font-semibold">Chính sách bảo mật thanh toán</h3>
                    <p className="mb-8 text-center text-justify">
                        Chúng tôi cam kết bảo mật thông tin thanh toán của khách hàng và chỉ sử dụng các phương thức thanh toán an toàn. Mọi giao dịch đều được mã hóa và bảo vệ nhằm đảm bảo sự an toàn tối đa cho khách hàng.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PaymentPolicyPage;

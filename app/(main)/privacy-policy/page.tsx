"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

import PageHeader from "@/features/layout/page-header";

import { Button } from "@/components/ui/button";

const PrivacyPolicyPage: React.FC = () => {
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
                title="Chính sách bảo mật"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Chính sách bảo mật", href: "/privacy-policy" },
                ]}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-4xl font-semibold">
                        Chính sách bảo mật
                    </h2>
                    <p className="mb-8 text-center text-justify">
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn khi
                        sử dụng dịch vụ của Mulio. Chính sách bảo mật này mô tả
                        cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của
                        bạn trong suốt quá trình mua sắm và tương tác với website.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        1. **Thu thập thông tin**: Khi bạn truy cập website,
                        chúng tôi có thể thu thập một số thông tin cá nhân như
                        tên, email, số điện thoại và địa chỉ giao hàng để phục
                        vụ cho việc xử lý đơn hàng và hỗ trợ khách hàng.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        2. **Sử dụng thông tin**: Chúng tôi sử dụng thông tin cá
                        nhân của bạn để cải thiện trải nghiệm mua sắm, xử lý
                        đơn hàng, gửi thông báo về các chương trình khuyến mãi
                        và cung cấp các dịch vụ hỗ trợ khách hàng.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        3. **Bảo vệ thông tin**: Mulio sử dụng các biện pháp bảo
                        mật nghiêm ngặt để đảm bảo an toàn cho thông tin cá nhân
                        của bạn. Chúng tôi cam kết không chia sẻ thông tin của
                        bạn với bên thứ ba trừ khi có yêu cầu của pháp luật.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        4. **Chính sách cookie**: Website của chúng tôi có thể sử
                        dụng cookie để nâng cao trải nghiệm người dùng. Bạn có thể
                        thay đổi cài đặt trình duyệt của mình để từ chối cookie
                        nếu không muốn tham gia vào các hoạt động này.
                    </p>
                    <p className="mb-8 text-center text-justify">
                        5. **Thay đổi chính sách bảo mật**: Mulio có quyền cập
                        nhật chính sách bảo mật này vào bất kỳ lúc nào. Mọi sự thay
                        đổi sẽ được thông báo trên website.
                    </p>
                    <p className="mb-4 text-center text-justify">
                        Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của
                        chúng tôi, vui lòng liên hệ với chúng tôi qua email
                        hoặc số điện thoại hỗ trợ khách hàng.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;

"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

import PageHeader from "@/features/layout/page-header";

import { Button } from "@/components/ui/button";

const ContactPage: React.FC = () => {
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
                title="Contact"
                breadcrumbItems={[
                    { label: "Home", href: "/home" },
                    { label: "Contact", href: "/contact" },
                ]}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-4xl font-semibold">
                        Liên hệ với chúng tôi
                    </h2>
                    <p className="mb-6 w-[700px] text-center text-gray-500">
                        Để biết thêm thông tin về sản phẩm và dịch vụ của chúng
                        tôi. Xin vui lòng gửi email cho chúng tôi. Nhân viên của
                        chúng tôi luôn có mặt để giúp đỡ bạn. Đừng ngần ngại!
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Left column with contact details */}
                    <div>
                        <div className="mb-4">
                            <h3 className="flex gap-2 font-semibold">
                                <FaMapMarkerAlt />
                                Địa chỉ
                            </h3>
                            <p className="w-72">
                                01 Võ Văn Ngân, phường Linh Chiểu, thành phố Thủ
                                Đức, Hồ Chí Minh
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="flex gap-2 font-semibold">
                                <FaPhoneAlt />
                                Số điện thoại
                            </h3>
                            <p>+84 987654321</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="flex gap-2 font-semibold">
                                <IoTime />
                                Thời gian làm việc
                            </h3>
                            <p>Thứ 2 - Thứ 6: 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>

                    {/* Right column with the form */}
                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            Gửi thắc mắc cho chúng tôi
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block font-semibold text-gray-700"
                                >
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#B88E2F] focus:outline-none focus:ring-[#B88E2F]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block font-semibold text-gray-700"
                                >
                                    Địa chỉ Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#B88E2F] focus:outline-none focus:ring-[#B88E2F]"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="message"
                                    className="block font-semibold text-gray-700"
                                >
                                    Mô tả nội dung
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#B88E2F] focus:outline-none focus:ring-[#B88E2F]"
                                    rows={4}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full rounded-md bg-[#B88E2F] px-4 py-2 font-semibold text-white hover:bg-[#C6A559] focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                            >
                                Gửi cho chúng tôi
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;

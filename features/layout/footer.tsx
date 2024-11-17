import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/shop", label: "Sản phẩm" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
    { href: "/payment-methods", label: "Phương thức thanh toán" },
    { href: "/returns", label: "Trả hàng" },
    { href: "/privacy-policy", label: "Chính sách bảo mật" },
];
const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 py-10">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
                    <div>
                        <div className="flex gap-2 pb-2">
                            <Image
                                width="400"
                                height="500"
                                alt="Mulio"
                                src="/logo.png"
                                className="h-8 w-auto"
                            />
                            <h2 className="text-4xl font-bold text-black">
                                Mulio
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600">
                            Địa chỉ: 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố
                            Thủ Đức, Thành phố Hồ Chí Minh
                            <br />
                            <br />
                            Số điện thoại: 0987654321
                        </p>
                    </div>
                    <div>
                        <h2 className="pb-2 text-lg font-bold text-black">
                            Liên kết
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="pb-2 text-lg font-bold text-black">
                            Giúp đỡ
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/payment-methods"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Phương thức thanh toán
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/returns"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Trả hàng
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-600 hover:text-black"
                                >
                                    Chính sách bảo mật
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="pb-2 text-lg font-bold text-black">
                            Tin tức
                        </h2>
                        <div className="flex gap-1">
                            <Input
                                type="email"
                                placeholder="Nhập địa chỉ email của bạn"
                                className="rounded-l-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button className="rounded-r-md bg-[#C5A254] p-2 text-sm text-white hover:bg-[#B88E2F]">
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
                <p className="mt-10 text-center text-gray-600">
                    &copy; 2024 Mulio. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

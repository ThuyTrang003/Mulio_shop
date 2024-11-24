"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";

const AccountDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative flex items-center text-black hover:text-[#B88E2F] text-base gap-1">
                    <MdAccountCircle className="h-6 w-6" />
                    Tài khoản
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-2 rounded-md bg-white shadow-lg">
                <Link
                    href="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                    Tài khoản của bạn
                </Link>
                <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                        // Xử lý logic đăng xuất ở đây, ví dụ: xóa token và chuyển hướng.
                        console.log("Logged out");
                        window.location.href = "/signin";
                    }}
                >
                    Đăng xuất
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountDropdown;

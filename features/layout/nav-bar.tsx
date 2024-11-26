"use client";

import { CartDropdown } from "../cart/components/cart-dropdown";
import CartPopup from "../cart/components/cart-popup";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

import { useAuthStore } from "@/stores/auth";
import { useLoadUser } from "@/hooks/auth-hook/useAuth";
import { Input } from "@/components/ui/input";
import AccountDropdown from "../account/account-dropdown";
const navigation = [
    { name: "Trang chủ", href: "/home" },
    { name: "Sản phẩm", href: "/shop" },
    { name: "Về chúng tôi", href: "/about-us" },
    { name: "Liên hệ", href: "/contact" },
];

const Navbar: React.FC = () => {
    // const { setToken, token, resetToken } = useAuthStore();
    const { setToken, token } = useAuthStore();

    const { data } = useLoadUser();
    console.log("token", token);
    const accessToken = token.accessToken;
    console.log("setToken", setToken);
    const [active, setActive] = useState("");
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [cartPopupOpen, setCartPopupOpen] = useState(false);
    useEffect(() => {
        const currentPath = window.location.pathname;
        setActive(currentPath);
    }, []);

    const handleActive = (href: string) => {
        setActive(href);
    };

    const toggleAccountMenu = () => {
        setAccountMenuOpen((prev) => !prev);
    };
    const toggleCartPopup = () => {
        setCartPopupOpen((prev) => !prev); // Mở hoặc đóng popup giỏ hàng
    };

    return (
        <nav className="fixed left-0 top-0 z-30 w-full bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center gap-2 text-4xl font-bold text-black">
                            <Image
                                width="100"
                                height="100"
                                alt="Mulio"
                                src="/logo.png"
                                className="h-8 w-auto"
                            />
                            <div>Mulio</div>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center justify-end space-x-14">
                                {navigation.map((item) => (
                                    <NavigationMenuItem key={item.name}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                onClick={() =>
                                                    handleActive(item.href)
                                                }
                                                aria-current={
                                                    active === item.href
                                                        ? "page"
                                                        : undefined
                                                }
                                                className={`relative rounded-md py-2 text-base font-semibold ${
                                                    active === item.href
                                                        ? "text-[#B88E2F]"
                                                        : "text-black hover:text-[#B88E2F]"
                                                }`}
                                            >
                                                {item.name}
                                                {active === item.href && (
                                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B88E2F]" />
                                                )}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                <div className="flex items-center space-x-5">
                                    <form className="relative flex items-center">
                                        <Input
                                            customSize="sm"
                                            type="search"
                                            className="text-sm"
                                            placeholder="Tìm kiếm sản phẩm..."
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-0 top-0 rounded-sm p-2 text-gray-300 hover:bg-slate-200 hover:text-black"
                                        >
                                            <IoSearch className="h-5 w-5" />
                                        </button>
                                    </form>
                                    <Link
                                        href="/favorites"
                                        className="relative flex items-center text-black hover:text-[#B88E2F]"
                                        onClick={() =>
                                            handleActive("/favorites")
                                        }
                                    >
                                        <CiHeart className="h-6 w-6" />
                                        {active === "/favorites" && (
                                            <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
                                        )}
                                    </Link>
                                    {/* <Link
                    href="/cart"
                    className="flex items-center text-gray-600 hover:text-black relative"
                    onClick={() => handleActive("/cart")}
                  >
                    <IoCartOutline className="h-6 w-6" />
                    {active === "/cart" && (
                      <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F] " />
                    )}
                  </Link> */}
                                    <CartDropdown>
                                        <button
                                            onClick={toggleCartPopup} // Mở hoặc đóng popup giỏ hàng
                                            className="relative flex items-center text-gray-600 hover:text-black"
                                        >
                                            <IoCartOutline className="h-6 w-6" />
                                            {active === "/cart" && (
                                                <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
                                            )}
                                        </button>
                                    </CartDropdown>
                                    {/* {cartPopupOpen && (
                                        <CartPopup onClose={toggleCartPopup} />
                                    )}{" "} */}
                                    {/* Hiển thị popup */}
                                    {/* <div className="relative">
                                        <button
                                            onClick={toggleAccountMenu}
                                            className="relative flex items-center text-black hover:text-[#B88E2F] text-base gap-1"
                                        >
                                            <MdAccountCircle className="h-6 w-6" />
                                            Đăng nhập
                                            {active === "/account" && (
                                                <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
                                            )}
                                        </button>
                                        {accountMenuOpen && (
                                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
                                                <Link
                                                    href="/account"
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                                    onClick={() => {
                                                        handleActive(
                                                            "/account",
                                                        );
                                                        setAccountMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                >
                                                    Tài khoản của bạn
                                                </Link>
                                                <Link
                                                    href="/signin"
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                                    onClick={() => {
                                                        handleActive("/signin");
                                                        setAccountMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </div>
                                        )}
                                    </div> */}
                                    {/* <div className="relative">
                                        <button
                                            onClick={() => {
                                                setAccountMenuOpen(false); // Close the account menu popup
                                                window.location.href =
                                                    "/signin"; // Navigate directly to /signin
                                            }}
                                            className="relative flex items-center gap-1 text-base text-black hover:text-[#B88E2F]"
                                        >
                                            <MdAccountCircle className="h-6 w-6" />
                                            Đăng nhập
                                            {active === "/account" && (
                                                <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
                                            )}
                                        </button>
                                    </div> */}
                                    <div className="relative">
                                        {accessToken ? ( // Kiểm tra token
                                            <button
                                                onClick={toggleAccountMenu} // Mở hoặc đóng popup
                                                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#B88E2F] text-white"
                                            >
                                                {/* Hình tròn đại diện cho tài khoản */}
                                                <MdAccountCircle className="h-6 w-6" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    (window.location.href =
                                                        "/signin")
                                                } // Điều hướng đến trang đăng nhập nếu không có token
                                                className="relative flex items-center gap-1 text-base text-black hover:text-[#B88E2F]"
                                            >
                                                <MdAccountCircle className="h-6 w-6" />
                                                Đăng nhập
                                            </button>
                                        )}
                                        {accountMenuOpen && (
                                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
                                                {/* Popup hiển thị khi bấm vào hình tròn */}
                                                <Link
                                                    href="/account"
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                                    onClick={() => {
                                                        handleActive(
                                                            "/account",
                                                        );
                                                        setAccountMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                >
                                                    Tài khoản của bạn
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        // resetToken(); // Đặt lại token
                                                        setAccountMenuOpen(
                                                            false,
                                                        );
                                                        window.location.href =
                                                            "/signin";
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                                                >
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

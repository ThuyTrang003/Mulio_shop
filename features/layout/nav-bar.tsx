"use client";

import { CartDropdown } from "../cart/components/cart-dropdown";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

import { useAuthStore } from "@/stores/auth";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const navigation = [
    { name: "Trang chủ", href: "/home" },
    { name: "Sản phẩm", href: "/shop" },
    { name: "Về chúng tôi", href: "/about-us" },
    { name: "Liên hệ", href: "/contact" },
];

const Navbar: React.FC = () => {
    // const { setToken, token, resetToken } = useAuthStore();
    const { setToken, token } = useAuthStore();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Redirect to the search page with the query parameter
            router.push(`/search?query=${searchQuery}`);
        }
    };
    console.log("token", token);
    const accessToken = token.accessToken;
    console.log("setToken", setToken);
    const [username, setUsername] = useState<string | null>(null);
    const [active, setActive] = useState("");
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const currentPath = window.location.pathname;
        setActive(currentPath);
    }, []);

    const handleActive = (href: string) => {
        setActive(href);
        if (accountMenuOpen) {
            setAccountMenuOpen(false);
        }
    };

    const toggleAccountMenu = () => {
        setAccountMenuOpen((prev) => !prev);
    };
    useEffect(() => {
        if (accessToken) {
            // Gọi API để lấy thông tin user
            fetch("http://localhost:8080/api/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Thêm accessToken vào header
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data?.data?.username) {
                        setUsername(data.data.username);
                    }
                })
                .catch((error) =>
                    console.error("Error fetching user data:", error),
                );
        }
    }, [accessToken]);
    useEffect(() => {
        // Close the account menu if clicking outside of it
        const handleClickOutside = (event: MouseEvent) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setAccountMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
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
                                    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                        <Input
                                            customSize="sm"
                                            type="search"
                                            className="text-sm"
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-0 top-0 rounded-sm p-2 text-gray-300 hover:bg-slate-200 hover:text-black"
                                        >
                                            <IoSearch className="h-5 w-5" />
                                        </button>
                                    </form>
                                    <Link
                                        href="/wishlist"
                                        className="relative flex items-center text-black hover:text-[#B88E2F]"
                                        onClick={() =>
                                            handleActive("/wishlist")
                                        }
                                    >
                                        <CiHeart className="h-6 w-6" />
                                        {active === "/wishlist" && (
                                            <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
                                        )}
                                    </Link>
                                    <CartDropdown>
                                        <button className="relative flex items-center text-gray-600 hover:text-black">
                                            <IoCartOutline className="h-6 w-6" />
                                            {active === "/cart" && (
                                                <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
                                            )}
                                        </button>
                                    </CartDropdown>
                                    <div className="relative">
                                        {accessToken ? (
                                            <button
                                                onClick={toggleAccountMenu}
                                                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#B88E2F] text-white"
                                            >
                                                {username ? (
                                                    <span className="text-lg uppercase">
                                                        {username.charAt(0)}{" "}
                                                    </span>
                                                ) : (
                                                    <MdAccountCircle className="h-6 w-6" />
                                                )}
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
                                            <div
                                                ref={accountMenuRef}
                                                className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg border"
                                            >
                                                <Link
                                                    href="/account"
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                                    onClick={() =>
                                                        setAccountMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Tài khoản của bạn
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setToken({
                                                            accessToken: "",
                                                            refreshToken: "",
                                                        });
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

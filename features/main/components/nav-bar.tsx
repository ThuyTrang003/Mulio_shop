// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@radix-ui/react-navigation-menu";
// import { MdAccountCircle } from "react-icons/md";
// import { CiHeart } from "react-icons/ci";
// import { IoCartOutline, IoSearch } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import CartPopup from "./cart-popup";

// const navigation = [
//   { name: "Trang chủ", href: "/home" },
//   { name: "Sản phẩm", href: "/shop" },
//   { name: "Về chúng tôi", href: "/blog" },
//   { name: "Liên hệ", href: "/contact" },
// ];

// const Navbar: React.FC = () => {
//   const [active, setActive] = useState("");
//   const [accountMenuOpen, setAccountMenuOpen] = useState(false);
//   const [cartPopupOpen, setCartPopupOpen] = useState(false);
//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     setActive(currentPath);
//   }, []);

//   const handleActive = (href: string) => {
//     setActive(href);
//   };

//   const toggleAccountMenu = () => {
//     setAccountMenuOpen((prev) => !prev);
//   };
//   const toggleCartPopup = () => {
//     setCartPopupOpen((prev) => !prev); // Mở hoặc đóng popup giỏ hàng
//   };

//   return (
//     <nav className="bg-white fixed top-0 left-0 w-full z-30 shadow-md">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex flex-shrink-0 items-center gap-2 text-4xl text-black font-bold">
//               <img alt="Mulio" src="/logo.png" className="h-8 w-auto" />
//               <div>Mulio</div>
//             </div>
//           </div>
//           <div className="hidden sm:block">
//             <NavigationMenu>
//               <NavigationMenuList className="flex space-x-14 items-center justify-end">
//                 {navigation.map((item) => (
//                   <NavigationMenuItem key={item.name}>
//                     <NavigationMenuLink asChild>
//                       <Link
//                         href={item.href}
//                         onClick={() => handleActive(item.href)}
//                         aria-current={active === item.href ? "page" : undefined}
//                         className={`relative rounded-md py-2 text-sm font-bold ${
//                           active === item.href
//                             ? "text-black"
//                             : "text-gray-600 hover:text-black"
//                         }`}
//                       >
//                         {item.name}
//                         {active === item.href && (
//                           <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#B88E2F]" />
//                         )}
//                       </Link>
//                     </NavigationMenuLink>
//                   </NavigationMenuItem>
//                 ))}
                
//                 <div className="flex items-center space-x-5">
//                   <form className="relative flex items-center">
//                     <Input
//                       type="search"
//                       className="text-sm"
//                       placeholder="Tìm kiếm sản phẩm..."
//                     />
//                     <button
//                       type="submit"
//                       className="absolute right-0 top-0 p-2 text-gray-300 hover:text-black"
//                     >
//                       <IoSearch className="h-6 w-6" />
//                     </button>
//                   </form>
//                   <Link
//                     href="/favorites"
//                     className="flex items-center text-gray-600 hover:text-black relative"
//                     onClick={() => handleActive("/favorites")}
//                   >
//                     <CiHeart className="h-6 w-6" />
//                     {active === "/favorites" && (
//                       <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
//                     )}
//                   </Link>
//                   {/* <Link
//                     href="/cart"
//                     className="flex items-center text-gray-600 hover:text-black relative"
//                     onClick={() => handleActive("/cart")}
//                   >
//                     <IoCartOutline className="h-6 w-6" />
//                     {active === "/cart" && (
//                       <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F] " />
//                     )}
//                   </Link> */}
//                   <button
//                     onClick={toggleCartPopup} // Mở hoặc đóng popup giỏ hàng
//                     className="flex items-center text-gray-600 hover:text-black relative"
//                   >
//                     <IoCartOutline className="h-6 w-6" />
//                     {active === "/cart" && (
//                       <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
//                     )}
//                   </button>
//                   {cartPopupOpen && <CartPopup onClose={toggleCartPopup} />} {/* Hiển thị popup */}
//                   <div className="relative">
//                     <button
//                       onClick={toggleAccountMenu}
//                       className="flex items-center text-gray-600 hover:text-black relative"
//                     >
//                       <MdAccountCircle className="h-6 w-6" />
//                       {active === "/account" && (
//                         <span className="absolute left-0 right-0 top-7 h-0.5 bg-[#B88E2F]" />
//                       )}
//                     </button>
//                     {accountMenuOpen && (
//                       <div className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
//                         <Link
//                           href="/account"
//                           className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                           onClick={() => {
//                             handleActive("/account");
//                             setAccountMenuOpen(false);
//                           }}
//                         >
//                           Tài khoản của bạn
//                         </Link>
//                         <Link
//                           href="/signin"
//                           className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                           onClick={() => {
//                             handleActive("/signin");
//                             setAccountMenuOpen(false);
//                           }}
//                         >
//                           Đăng xuất
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

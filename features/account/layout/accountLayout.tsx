"use client";

import React, { useState } from "react";

import ChangePasswordForm from "@/features/account/components/chancepass-form";
import UserProfileForm from "@/features/account/components/info-form";
import PurchaseHistory from "@/features/account/components/purchase-history";

export default function ProfileLayout() {
    const [activeForm, setActiveForm] = useState("userInfo"); // Mặc định hiển thị 'Thông tin cá nhân'

    const buttonClass =
        "w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100";

    const renderActiveForm = () => {
        switch (activeForm) {
            case "userInfo":
                return <UserProfileForm />;
            case "changePassword":
                return <ChangePasswordForm />;
            case "purchaseHistory":
                return <PurchaseHistory />;
            default:
                return <UserProfileForm />;
        }
    };

    return (
        <div className="container mx-auto flex px-4 py-6">
            {/* Cột trái: Danh sách mục */}
            <div className="w-1/3 space-y-4 pl-10">
                <button
                    onClick={() => setActiveForm("userInfo")}
                    aria-label="View personal information"
                    className={`${buttonClass} ${activeForm === "userInfo" ? "font-bold" : ""}`}
                >
                    Thông tin cá nhân
                </button>
                <button
                    onClick={() => setActiveForm("changePassword")}
                    aria-label="Change password"
                    className={`${buttonClass} ${activeForm === "changePassword" ? "font-bold" : ""}`}
                >
                    Đổi mật khẩu
                </button>
                <button
                    onClick={() => setActiveForm("purchaseHistory")}
                    aria-label="View purchase history"
                    className={`${buttonClass} ${activeForm === "purchaseHistory" ? "font-bold" : ""}`}
                >
                    Lịch sử mua hàng
                </button>
            </div>

            {/* Cột phải: Hiển thị form tương ứng */}
            <div className="w-2/3 rounded-lg bg-white p-6">
                {renderActiveForm()}
            </div>
        </div>
    );
}

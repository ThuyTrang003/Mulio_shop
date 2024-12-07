"use client";

import React, { useState } from "react";
import { toast } from "sonner";

// Import toast từ Sonner
import { usePostPassword } from "@/hooks/user-hook/use-password";

import { useAuthStore } from "@/stores/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { token } = useAuthStore();
    const { mutateAsync: postPassword } = usePostPassword();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword === formData.confirmPassword) {
            try {
                await postPassword({
                    oldPassword: formData.currentPassword, // Updated key
                    newPassword: formData.newPassword,
                    accessToken: token?.accessToken, // Pass valid token
                });
                toast.success("Cập nhật mật khẩu thành công."); // Success notification
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } catch (error: any) {
                // Xử lý lỗi trả về từ API
                if (error.response?.data?.message === "Old password is incorrect" || error.response?.data?.message === "Validation failed") {
                    toast.error("Mật khẩu hiện tại không đúng."); // Hiển thị thông báo lỗi
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            "Đã xảy ra lỗi, vui lòng thử lại sau."
                    ); // Hiển thị lỗi khác nếu có
                }
                console.error("Error updating password:", error);
            }
        } else {
            toast.error("Mật khẩu xác nhận không khớp!"); // Password mismatch notification
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-md space-y-4"
            >
                <div>
                    <Label htmlFor="currentPassword" className="mb-2 block">
                        Mật khẩu hiện tại
                    </Label>
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu hiện tại"
                    />
                </div>
                <div>
                    <Label htmlFor="newPassword" className="mb-2 block">
                        Mật khẩu mới
                    </Label>
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu mới"
                    />
                </div>
                <div>
                    <Label htmlFor="confirmPassword" className="mb-2 block">
                        Xác nhận mật khẩu
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu mới"
                    />
                </div>
                <Button
                    type="submit"
                    variant="secondary"
                    className="w-full bg-yellow-600 text-white hover:bg-yellow-700"
                >
                    Cập nhật mật khẩu mới
                </Button>
            </form>
        </>
    );
}

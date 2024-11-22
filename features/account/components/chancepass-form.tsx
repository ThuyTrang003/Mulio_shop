"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            console.log("Password updated:", formData.newPassword);
            // Call your API to update the password
        } else {
            console.error("Passwords do not match!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
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
    );
}

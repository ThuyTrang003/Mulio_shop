"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCustomerInfo, useUpdateCustomerInfo } from "@/hooks/user-hook/useCustomerInfo";

export default function UserProfileForm() {
  const { data: customerInfo, isLoading, isError, refetch } = useCustomerInfo();
  const updateCustomerInfo = useUpdateCustomerInfo();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (customerInfo) {
      setFormData({
        fullName: customerInfo.fullName || "",
        phone: customerInfo.phone || "",
        address: customerInfo.address || "",
      });
    }
  }, [customerInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomerInfo.mutateAsync(formData);
      alert("Thông tin cập nhật thành công!");
      refetch(); // Cập nhật lại dữ liệu sau khi chỉnh sửa
    } catch (err) {
      console.error("Error updating customer info:", err);
      alert("Đã xảy ra lỗi khi cập nhật thông tin.");
    }
  };

  if (isLoading) return <p>Đang tải...</p>;
  if (isError) return <p>Không thể tải thông tin người dùng.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="fullName">Họ Tên:</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nhập họ tên"
        />
      </div>
      <div>
        <Label htmlFor="phone">Số Điện Thoại:</Label>
        <Input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Nhập số điện thoại"
        />
      </div>
      <div>
        <Label htmlFor="address">Địa Chỉ:</Label>
        <Input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Nhập địa chỉ"
        />
      </div>
      <Button type="submit" variant="secondary" className="w-full" disabled={updateCustomerInfo.isLoading}>
        {updateCustomerInfo.isLoading ? "Đang xử lý..." : "Chỉnh sửa thông tin"}
      </Button>
    </form>
  );
}

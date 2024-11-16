"use client"

import React, { useEffect, useState } from "react";
import PageHeader from "@/features/main/components/page-header";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

interface Location {
  code: number;
  name: string;
}

const CheckoutPage: React.FC = () => {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Fetch provinces on mount
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) => response.json())
        .then((data) => setDistricts(data.districts || []))
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Fetch wards when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((response) => response.json())
        .then((data) => setWards(data.wards || []))
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  return (
    <>
      <PageHeader
        backgroundImage="/banner_shop.png"
        title="Checkout"
        breadcrumbItems={[
          { label: "Home", href: "/home" },
          { label: "Checkout", href: "/checkout" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Billing Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Chi tiết thanh toán</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ tên
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B88E2F] focus:border-[#B88E2F] sm:text-sm"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B88E2F] focus:border-[#B88E2F] sm:text-sm"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B88E2F] focus:border-[#B88E2F] sm:text-sm"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tỉnh/Thành phố
              </label>
              <Select
                options={provinces.map((province) => ({
                  value: province.code.toString(),
                  label: province.name,
                }))}
                placeholder="Chọn Tỉnh/Thành phố"
                onChange={(value) => setSelectedProvince(value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quận/Huyện
              </label>
              <Select
                options={districts.map((district) => ({
                  value: district.code.toString(),
                  label: district.name,
                }))}
                placeholder="Chọn Quận/Huyện"
                onChange={(value) => setSelectedDistrict(value)}
                className="mt-1"
                disabled={!selectedProvince}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phường/Xã
              </label>
              <Select
                options={wards.map((ward) => ({
                  value: ward.code.toString(),
                  label: ward.name,
                }))}
                placeholder="Chọn Phường/Xã"
                onChange={(value) => setSelectedWard(value)}
                className="mt-1"
                disabled={!selectedDistrict}
              />
            </div>
          </div>

          {/* Right Column: Cart Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Giỏ hàng của bạn</h2>
            <div>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-2">Sản phẩm</th>
                    <th scope="col" className="px-4 py-2">Số lượng</th>
                    <th scope="col" className="px-4 py-2">Màu sắc</th>
                    <th scope="col" className="px-4 py-2">Kích thước</th>
                    <th scope="col" className="px-4 py-2">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render dynamic product rows */}
                  <tr>
                    <td className="px-4 py-2">Áo thun</td>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">Đen</td>
                    <td className="px-4 py-2">L</td>
                    <td className="px-4 py-2">400,000 VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-[#B88E2F] text-lg">400,000 VND</span>
            </div>
            <hr className="my-4 border-gray-300" />

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold">Chọn phương thức thanh toán</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    onChange={() => setPaymentMethod("COD")}
                    checked={paymentMethod === "COD"}
                    className="mr-2"
                  />
                  Thanh toán khi nhận hàng
                </label>
                {paymentMethod === "COD" && (
                  <p className="pl-5 text-sm text-gray-500 mt-2">
                    Thanh toán tiền mặt cho người giao hàng khi nhận sản phẩm. Đây là cách đơn giản và an toàn, giúp bạn kiểm tra sản phẩm trước khi thanh toán.
                  </p>
                )}
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="BankTransfer"
                    onChange={() => setPaymentMethod("BankTransfer")}
                    checked={paymentMethod === "BankTransfer"}
                    className="mr-2"
                  />
                  Chuyển khoản ngân hàng
                </label>
                {paymentMethod === "BankTransfer" && (
                  <p className="pl-5 text-sm text-gray-500 mt-2">
                    Chuyển khoản vào tài khoản ngân hàng của cửa hàng trước khi nhận sản phẩm. Phương thức này giúp bạn thanh toán nhanh chóng và tiện lợi.
                  </p>
                )}
              </div>
            </div>

            <button className="w-full bg-[#B88E2F] text-white font-semibold py-2 rounded-full hover:bg-[#C6A559] focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-opacity-50">
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;

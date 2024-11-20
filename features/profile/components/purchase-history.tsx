import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface PurchaseItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface PurchaseGroup {
  items: PurchaseItem[];
  total: number;
}

export default function PurchaseHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseGroup[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<PurchaseGroup[]>([]);

  useEffect(() => {
    async function fetchPurchaseHistory() {
      try {
        const response = await fetch("https://your-backend-api.com/purchase-history");
        const data: PurchaseGroup[] = await response.json();
        setPurchaseHistory(data);
        setFilteredHistory(data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    }

    fetchPurchaseHistory();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = purchaseHistory.filter((group) =>
        group.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(purchaseHistory);
    }
  }, [searchTerm, purchaseHistory]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <Input
          type="text"
          placeholder="Bạn có thể tìm kiếm theo tên Shop hoặc tên Sản phẩm"
          className="w-full border border-gray-300 rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredHistory.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-gray-50 rounded-lg shadow-md p-4">
            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex justify-between items-center ${
                    itemIndex < group.items.length - 1 ? "border-b pb-4" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-gray-500 text-sm">x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700">
                    {item.price.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <p className="font-bold text-gray-800">Thành tiền</p>
              <p className="font-bold text-xl text-gray-900">
                {group.total.toLocaleString("vi-VN")} VND
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-yellow-600 text-white font-bold py-2 px-6 rounded">
          Xem thêm
        </button>
      </div>
    </div>
  );
}

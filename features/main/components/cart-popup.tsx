import { Button } from "@/components/ui/button"; 
import React from "react";
import { TbShoppingBagX } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";

interface CartPopupProps {
  onClose: () => void;
}

const products = [
  { id: "1", category: "shirt", image: "/cardigan/c-1.png", name: "Áo Cardigan", count: 2, price: 300000, color: "Xanh đậm" },
  { id: "2", category: "shirt", image: "/cardigan/c-2.png", name: "Áo Cardigan", count: 1, price: 300000, color: "Xám" },
  { id: "3", category: "shirt", image: "/cardigan/c-3.png", name: "Áo Cardigan", count: 3, price: 300000, color: "Đen" },
  { id: "4", category: "shirt", image: "/cardigan/c-4.png", name: "Áo Cardigan", count: 5, price: 300000, color: "Xanh" },
];

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const router = useRouter();

  // Calculate the total price
  const totalPrice = products.reduce((total, product) => total + product.count * product.price, 0);

  // Handle opening the cart page and closing the popup
  const handleOpenCart = () => {
    onClose(); // Close the popup
    router.push(`/cart`); // Navigate to the cart page
  };
  const handleOpenCheckout = () => {
    onClose(); // Close the popup
    router.push(`/checkout`); // Navigate to the cart page
  };
  return (
    <>
      {/* Dark overlay */}
      <div 
        className="fixed top-0 left-[-2rem] w-[2000px] h-full bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      
      {/* Popup content */}
      <div className="absolute right-[4.5rem] top-[-4.75rem] mt-16 ml-8 w-80 bg-white shadow-xl border border-gray-300 p-4 z-20">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="font-semibold text-lg">Giỏ hàng của bạn</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <TbShoppingBagX />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-[5rem] h-[5rem] mr-4" />
                <div>
                  <h4 className="text-sm font-semibold">{product.name}</h4>
                  <p className="text-xs text-gray-500">Màu: {product.color}</p>
                  <div className="flex gap-1"><p className="text-sm">{product.count} x </p>
                  <p className="text-sm text-[#B88E2F]">{product.price.toLocaleString()} VNĐ</p></div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="text-red-500 hover:text-red-700">
                  <TiDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price and Divider */}
        <div className="border-b border-gray-300 mt-4 pt-4 pb-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Tổng cộng:</p>
            <h5 className="font-semibold text-[#B88E2F]">{totalPrice.toLocaleString()} VNĐ</h5>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-between mt-4">
          <Button 
            className="w-full py-2 px-4 bg-[#B88E2F] hover:bg-[#C6A559] rounded-full text-sm font-semibold" 
            onClick={handleOpenCart}
          >
            Xem giỏ hàng
          </Button>
          <Button 
            className="w-full py-2 px-4 border-[1px] border-[#B88E2F] hover:bg-[#B88E2F] hover:text-[white] text-black bg-color-none rounded-full text-sm font-semibold"
            onClick={handleOpenCheckout}
            >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPopup;

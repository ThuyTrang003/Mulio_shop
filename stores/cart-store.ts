import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CartItem } from "@/types/cart-item-type";

// Định nghĩa kiểu cho store Zustand
interface CartStore {
    cartId: string | null;
    setCartId: (cartId: string) => void; // Thay đ��i id của gi�� hàng
    cartItems: CartItem[]; // Danh sách sản phẩm trong giỏ
    addProduct: (product: CartItem) => void; // Thêm sản phẩm
    updateAmount: (productId: string, newAmount: number) => void; // Cập nhật số lượng
    removeProduct: (productId: string) => void; // Xóa sản phẩm
    clearCart: () => void; // Xóa toàn bộ giỏ hàng
}

// Tạo store Zustand
const useCartStore = create(
    persist<CartStore>(
        (set) => ({
            cartItems: [],
            cartId: null,
            setCartId: (payload) => set(() => ({ cartId: payload })),
            addProduct: (product) =>
                set((state) => {
                    const existingProduct = state.cartItems.find(
                        (item) => item.productId === product.productId,
                    );

                    if (existingProduct) {
                        return {
                            cartItems: state.cartItems.map((item) =>
                                item.productId === product.productId
                                    ? {
                                          ...item,
                                          amount: item.amount + product.amount,
                                          totalPrice:
                                              (item.amount + product.amount) *
                                              item.price,
                                      }
                                    : item,
                            ),
                        };
                    }

                    return { cartItems: [...state.cartItems, product] };
                }),

            updateAmount: (productId, newAmount) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.productId === productId
                            ? {
                                  ...item,
                                  amount: newAmount,
                                  totalPrice: newAmount * item.price,
                              }
                            : item,
                    ),
                })),

            removeProduct: (productId) =>
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (item) => item.productId !== productId,
                    ),
                })),

            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: "car",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useCartStore;

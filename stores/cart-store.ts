import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
    cartId: string | null;
    setCartId: (cartId: string) => void;
}

// Tạo store Zustand
const useCartStore = create(
    persist<CartStore>(
        (set) => ({
            cartId: null,
            setCartId: (payload) => set(() => ({ cartId: payload })),
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useCartStore;

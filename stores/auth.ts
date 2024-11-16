import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  token: string |null;
  setToken: (token: string) => void;
  resetToken: () => void;
}
export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      setToken: (payload) => set(() => ({ token: payload})),
      resetToken: () => set(() => ({ token: null})),
    }),

    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

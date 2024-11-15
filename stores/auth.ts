import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  token: string|null;
  setToken: (token: string) => void;
}
export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      setToken: (payload) => set(() => ({ token: payload})),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

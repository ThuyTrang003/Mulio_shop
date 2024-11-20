import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    token: {
        accessToken: string | null;
        refreshToken: string | null;
    };
    setToken: (token: { accessToken: string; refreshToken: string }) => void;
    resetAuth: () => void;
}
export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            token: {
                accessToken: null,
                refreshToken: null,
            },
            setToken: (payload) =>
                set(() => ({
                    token: {
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken,
                    },
                })),
            resetAuth: () =>
                set(() => ({
                    token: {
                        accessToken: null,
                        refreshToken: null,
                    },
                    userId: null,
                })),
        }),

        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    token: {
        accessToken: string | null;
        refreshToken: string | null;
    };
    userId: string | null;
    setUserId: (userId: string) => void;
    setToken: (token: { accessToken: string; refreshToken: string }) => void;
    refreshToken: (token: { refreshToken: string }) => void;
    resetAuth: () => void;
}
export const useAuthStore = create(
    persist<AuthStore>(
        (set, get) => ({
            token: {
                accessToken: null,
                refreshToken: null,
            },
            userId: null,
            setUserId: (userId) => set({ userId: userId }),
            refreshToken: () => {
                const { token } = get();
                if (token.refreshToken) {
                    set({
                        token: {
                            accessToken: token.refreshToken,
                            refreshToken: token.refreshToken,
                        },
                    });
                } else {
                    console.warn(
                        "Refresh token is null. Cannot refresh access token.",
                    );
                }
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

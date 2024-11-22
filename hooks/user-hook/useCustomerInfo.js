import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useAuthStore } from "@/stores/auth";

// Import your auth store to get the token

export const useGetInfo = () => {
    const { token } = useAuthStore(); // Retrieve the token from the auth store

    return useQuery({
        queryKey: ["customerInfo"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost:8080/api/users/customer-info",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
                    },
                },
            );
            return response.data;
        },
    });
};

"use client";

import { useQuery, useMutation } from "@tanstack/react-query"; // Import useMutation here
import apiClient from "@/apis/api-constant";

// Function to fetch customer info
const fetchCustomerInfo = async () => {
  const response = await apiClient.get("/api/users/customer-info");
  return response.data.data; // Ensure API response is structured as expected
};

// Hook to fetch customer info
export const useCustomerInfo = () => {
  return useQuery({
    queryKey: ["customerInfo"],
    queryFn: fetchCustomerInfo,
    staleTime: 60000,
    cacheTime: 300000,
  });
};

// Hook to update customer info
export const useUpdateCustomerInfo = () => {
  return useMutation((formData) =>
    apiClient.post("/api/users/customer-info", formData)
  );
};

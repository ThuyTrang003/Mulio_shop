// import { updateInfo } from "../../apis/user-api/account";
// import { useMutation, useQuery } from "@tanstack/react-query";
// export const useUpdateInfo = () => {
//     return useQuery({
//         queryKey: ["updateInfo"],
//         queryFn: updateInfo,
//     });
// };
// import { updateInfo } from "../../apis/user-api/account";
// import { useMutation } from "@tanstack/react-query";
// export const useUpdateInfo = () => {
//     return useMutation({
//         mutationFn: updateInfo, // Pass the update function here
//         queryKey: ["updateInfo"],
//         queryFn: updateInfo,
//     });
// };
// hooks/user-hook/useUpdateCustomerInfo.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateInfo = () => {
    return useMutation(async (data) => {
        const response = await axios.put(
            "http://localhost:8080/api/users/update-info",
            data,
        );
        return response.data;
    });
};

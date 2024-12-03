import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useGetInfo, useUpdateInfo } from "@/hooks/user-hook/use-profile";

import { useAuthStore } from "@/stores/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserProfileForm() {
    const router = useRouter();
    const { setToken, token } = useAuthStore();
    const { data: userInfo, isError, error, isLoading } = useGetInfo();
    const { mutate: updateMutate, isPending } = useUpdateInfo();
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        if (userInfo) {
            setUserData({
                fullName: userInfo.fullName || "",
                phone: userInfo.phone || "",
                email: userInfo.email || "",
                address: userInfo.address || "",
            });
        }
    }, [userInfo]);

    const handleSave = async () => {
        try {
            // Call the update mutation function
            await updateMutate(userData);
            setEditing(false);
            // Show success notification
            toast.success("Thông tin đã được cập nhật thành công!");
        } catch (err) {
            // Show error notification
            toast.error("Đã xảy ra lỗi khi cập nhật thông tin.");
        }
    };

    if (isError) {
        console.error(error);
        return <p>Đã xảy ra lỗi khi tải thông tin người dùng.</p>;
    }

    return (
        <div className="mx-auto max-w-md space-y-4">
            <h2 className="mb-6 text-xl font-semibold">Thông tin người dùng</h2>
            {isLoading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <Label
                            htmlFor="fullName"
                            className="text-sm font-medium"
                        >
                            Họ và Tên:
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            value={userData.fullName}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    fullName: e.target.value,
                                })
                            }
                            customSize="default"
                            disabled={!editing}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="phone" className="text-sm font-medium">
                            Số điện thoại:
                        </Label>
                        <Input
                            id="phone"
                            type="text"
                            value={userData.phone}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    phone: e.target.value,
                                })
                            }
                            customSize="default"
                            disabled={!editing}
                        />
                    </div>
                    {/* Thêm trường Email */}
                    <div className="flex flex-col">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email:
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    email: e.target.value,
                                })
                            }
                            customSize="default"
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label
                            htmlFor="address"
                            className="text-sm font-medium"
                        >
                            Địa chỉ:
                        </Label>
                        <Input
                            id="address"
                            type="text"
                            value={userData.address}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    address: e.target.value,
                                })
                            }
                            customSize="default"
                            disabled={!editing}
                        />
                    </div>
                </div>
            )}
            <div className="mt-6 flex gap-4">
                <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setEditing(!editing)}
                >
                    {editing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
                </Button>
                {editing && (
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? "Đang lưu..." : "Lưu"}
                    </Button>
                )}
            </div>
        </div>
    );
}

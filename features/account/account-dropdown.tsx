"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AccountDropdown: React.FC = () => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#B88E2F] text-white">
          <MdAccountCircle className="h-6 w-6" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          <DropdownMenuPrimitive.Item
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            <Link href="/account" className="w-full">Tài khoản của bạn</Link>
          </DropdownMenuPrimitive.Item>
          <DropdownMenuPrimitive.Item
            onClick={() => {
              // Handle logout here
              window.location.href = "/signin"; // Redirect to sign in
            }}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Đăng xuất
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export default AccountDropdown;

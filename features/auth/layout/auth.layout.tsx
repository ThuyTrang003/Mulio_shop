import Link from "next/link";

import { OauthButton } from "@/features/auth/components/oauth";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface AuthLayoutProps {
    title: string;
    subTitle?: string;
    isSignin?: boolean;
    children?: React.ReactNode;
}
export function AuthLayout({
    children,
    title,
    isSignin,
    subTitle,
}: AuthLayoutProps) {
    const footerLink = isSignin
        ? {
              title: "Chưa có tài khoản?",
              href: "/signup",
              text: "Đăng ký",
          }
        : {
              title: "Đã có tài khoản?",
              href: "/signin",
              text: "Đăng nhập",
          };

    return (
        <Card className="w-[400px] border-0">
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl">{title} </CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            {children}
            <OauthButton />
            <CardDescription className="flex justify-center text-base">
                <span className="text-gray-500">{footerLink.title}</span>
                <Link
                    href={footerLink.href}
                    className="font-semibold text-item hover:underline"
                >
                    {" "}
                    {footerLink.text}
                </Link>
            </CardDescription>
        </Card>
    );
}

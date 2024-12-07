import { SigninForm } from "@/features/auth/components/signin-form";
import { AuthLayout } from "@/features/auth/layout/auth.layout";

export default function SigninPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <AuthLayout
                title="Đăng nhập"
                subTitle="Vui lòng nhập thông tin của bạn!"
                isSignin={true}
            >
                <SigninForm />
            </AuthLayout>
        </div>
    );
}

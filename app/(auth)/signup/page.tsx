import { SignupForm } from "@/features/auth/components/signup-form";
import { AuthLayout } from "@/features/auth/layout/auth.layout";

export default function SigninPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <AuthLayout
                title="Đăng ký"
                subTitle="Vui lòng nhập thông tin để tạo tài khoản"
                isSignin={false}
            >
                <SignupForm />
            </AuthLayout>
        </div>
    );
}

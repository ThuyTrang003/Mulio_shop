import { SigninForm } from "@/features/auth/components/signin-form";
import { AuthLayout } from "@/features/auth/layout/auth.layout";

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <AuthLayout
        title="WELCOME BACK"
        subTitle="Welcome back! Please enter your detail."
        isSignin={true}
      >
        <SigninForm />
      </AuthLayout>
    </div>
  );
}

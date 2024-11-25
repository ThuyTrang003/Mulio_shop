"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { useIsVerify } from "@/hooks/auth-hook/useAuth";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { data, isError, isSuccess, error, isPending } = useIsVerify({
        token: token,
    });

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Email Confirmation</CardTitle>
                    <CardDescription>
                        Status of your email confirmation
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSuccess && (
                        <Alert variant="default">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>Email Confirmed</AlertTitle>
                        </Alert>
                    )}
                    {isError && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}
                    {isPending && (
                        <Skeleton>
                            <div className="h-8 w-8" />
                        </Skeleton>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {isSuccess ? (
                        <Button
                            onClick={() => {
                                router.replace("/signin");
                            }}
                        >
                            Signin to continue
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                router.replace("/signup");
                            }}
                        >
                            Go to signup
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

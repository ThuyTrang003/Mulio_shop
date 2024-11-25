import { moneyFormatter } from "@/utils/money-formatter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentProps {
    totalPrice: number;
    totalNumber: number;
}
export default function Payment({ totalPrice, totalNumber }: PaymentProps) {
    return (
        <Card className="w-full max-w-md bg-amber-1/50">
            <CardHeader>
                <CardTitle>Đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Coupon Section */}
                {/* <div className="space-y-2">
                    <p className="text-sm font-medium">Nhập mã khuyến mãi</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter your coupon"
                            className="bg-white"
                        />
                        <Button className="bg-[#B4925A] text-white hover:bg-[#8b7246]">
                            Áp dụng
                        </Button>
                    </div>
                </div> */}

                {/* Order Summary */}
                <div className="space-y-3">
                    {/* <div className="flex justify-between">
                        <span>Đơn hàng</span>
                        <span>{moneyFormatter(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Giảm</span>
                        <span>0VND</span>
                    </div> */}
                    <Separator />
                    <div className="flex justify-between font-medium">
                        <span>Số sản phẩm</span>
                        <span>{totalNumber}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>TẠM TÍNH</span>
                        <span>{moneyFormatter(totalPrice)}</span>
                    </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-item/70 text-white hover:bg-item">
                    TIẾP TỤC THANH TOÁN
                </Button>
            </CardContent>
        </Card>
    );
}

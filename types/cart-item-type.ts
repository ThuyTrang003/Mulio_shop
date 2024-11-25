// Định nghĩa kiểu cho sản phẩm trong giỏ hàng
export interface CartItem {
    productId: string;
    productName: string;
    price: number;
    description: string;
    size: string;
    color: string;
    amount: number;
    productType: string;
    image: string;
    totalPrice: number;
}

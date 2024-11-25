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
    skuBase: string; // code tương ứng với product id
    skuCode: string; //code tương ứng với itemId (productId, size, color)
}

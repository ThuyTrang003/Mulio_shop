export interface ReviewType {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    images: string[];
    createdAt: string;
}

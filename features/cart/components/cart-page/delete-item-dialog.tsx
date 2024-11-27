import { useQueryClient } from "@tanstack/react-query";

import { useDeleteProductToCart } from "@/hooks/cart-hook/use-cart";

import useCartStore from "@/stores/cart-store";

import { AlertDialogSection } from "@/components/alert-dialog-section";

interface DeleteItemDialogProps {
    productId: string;
    productName: string;
    children: React.ReactNode;
}
export function DeleteItemDialog({
    productId,
    productName,
    children,
}: DeleteItemDialogProps) {
    const { mutate: deleteItem } = useDeleteProductToCart();
    const { cartId } = useCartStore();
    const queryClient = useQueryClient();

    const handleDeleteItemToCart = () => {
        deleteItem(
            {
                cartId: cartId,
                productId: productId,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["getCart"],
                    });
                },
            },
        );
    };
    return (
        <AlertDialogSection
            title="Confirm remove item to cart"
            description={`Are you sure you want to remove item ${productName}?`}
            cancelButtonContent="No"
            actionButtonContent="Yes"
            handleAction={handleDeleteItemToCart}
        >
            {children}
        </AlertDialogSection>
    );
}

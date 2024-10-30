import React, { useState } from "react";
import FeatureProduct from "@/features/main/components/feature-product";
import { Button } from "@/components/ui/button";

interface Product {
  image: string;
  name: string;
  price: string;
  description: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleShowMore = () => {
    // Hiển thị toàn bộ sản phẩm
    setVisibleProducts(products.length);
  };

  return (
    <section className="mx-14 my-10 flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, visibleProducts).map((product, index) => (
          <FeatureProduct
            key={index}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
      {visibleProducts < products.length && (
        <Button size="sm" variant="outline" onClick={handleShowMore}>
          Xem thêm
        </Button>
      )}
    </section>
  );
};

export default ProductSection;

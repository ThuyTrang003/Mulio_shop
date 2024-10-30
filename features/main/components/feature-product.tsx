import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureProductProps {
  image: string;
  name: string;
  price: string;
  description: string;
}

const FeatureProduct: React.FC<FeatureProductProps> = ({ image, name, price, description }) => {
  return (
    <Card className="w-full max-w-xs rounded-xl border width">
      <div className="grid gap-4 p-4">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <img
            src={image}
            alt={name}
            width="400"
            height="500"
            className="aspect-[4/5] object-cover border w-full"
          />
        </div>
        <div className="grid gap-1.5">
          <h3 className="font-semibold text-sm md:text-base">{name}</h3>
          <p className="font-semibold text-sm md:text-base">{price}</p>
          <p className="text-sm md:text-base text-gray-600">{description}</p>
        </div>
        <Button size="sm">Thêm vào giỏ hàng</Button>
      </div>
    </Card>
  );
};

export default FeatureProduct;

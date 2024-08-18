import { Card, Button } from "@mui/material";
import { Product } from "../interfaces/Product";
import defaultImage from "../assets/images/defaultImage.png";

interface ProductCardProps {
  product: Product;
  onOrder: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrder }) => {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <Card className="p-4">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="h-48 w-full object-cover mb-2"
        onError={handleImageError}
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p>Preparation Time: {product.preparation_time} seconds</p>
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={() => onOrder(product.id)}
      >
        Order
      </Button>
    </Card>
  );
};

export default ProductCard;

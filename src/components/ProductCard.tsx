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
    <Card className="p-3">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="h-48 w-full object-cover mb-2"
        onError={handleImageError}
      />
      <h2 className="text-[16px] font-bold mb-1">{product.name}</h2>
      <p className="mb-2 text-[12px]">
        Preparation Time: {product.preparation_time} seconds
      </p>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: "12px", textTransform: "none" }}
        onClick={() => onOrder(product.id)}
      >
        Order
      </Button>
    </Card>
  );
};

export default ProductCard;

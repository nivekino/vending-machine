import { useState, useEffect } from "react";
import { Card, Button, CircularProgress } from "@mui/material";
import { Product } from "../interfaces/Product";
import defaultImage from "../assets/images/defaultImage.png";

interface ProductCardProps {
  product: Product;
  onOrder: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrder }) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = defaultImage;
  };

  const handleOrderClick = () => {
    setIsOrdering(true);
    setCountdown(5);
    onOrder(product.id);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setIsOrdering(false);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

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
        onClick={handleOrderClick}
        disabled={isOrdering}
      >
        {isOrdering ? <CircularProgress size={20} /> : "Order"}
      </Button>
    </Card>
  );
};

export default ProductCard;

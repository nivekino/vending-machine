import { Card, Skeleton } from "@mui/material";

const ProductSkeleton: React.FC = () => {
  return (
    <Card className="p-4">
      <Skeleton variant="rectangular" height={200} />
      <Skeleton width="60%" height={30} className="mt-4" />
      <Skeleton width="40%" height={20} />
      <Skeleton width="80%" height={40} className="mt-4" />
    </Card>
  );
};

export default ProductSkeleton;

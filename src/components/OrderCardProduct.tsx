import { Card, CardContent, Typography, LinearProgress } from "@mui/material";

interface OrderCardProductProps {
  productName: string;
  preparationTime: number;
  timeLeft: number;
}

const OrderCardProduct: React.FC<OrderCardProductProps> = ({
  productName,
  preparationTime,
  timeLeft,
}) => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-[16px] font-bold mb-1">{productName}</h2>
        <LinearProgress
          variant="determinate"
          value={
            ((preparationTime - Math.max(timeLeft, 0)) / preparationTime) * 100
          }
        />
        <Typography variant="body2" color="textSecondary">
          {Math.max(timeLeft, 0)} seconds remaining
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCardProduct;

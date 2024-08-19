import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  CardMedia,
  Box,
} from "@mui/material";

interface OrderCardProductProps {
  productName: string;
  preparationTime: number;
  timeLeft: number;
  imageSrc: string;
  onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const OrderCardProduct: React.FC<OrderCardProductProps> = ({
  productName,
  preparationTime,
  timeLeft,
  imageSrc,
  onError,
}) => {
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{
            width: 60,
            height: 60,
            objectFit: "cover",
            marginRight: 2,
            marginLeft: 2,
          }}
          image={imageSrc}
          alt={productName}
          onError={onError}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontSize: "13px", fontWeight: "bold", marginBottom: 1 }}
          >
            {productName}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={
              ((preparationTime - Math.max(timeLeft, 0)) / preparationTime) *
              100
            }
          />
          <Typography variant="body2" color="textSecondary">
            {Math.max(timeLeft, 0)} seconds remaining
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default OrderCardProduct;

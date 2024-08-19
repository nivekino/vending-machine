import { Card, CardContent, Typography } from "@mui/material";

interface DispatchedCardProductProps {
  thumbnail: string;
  name: string;
  onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const DispatchedCardProduct: React.FC<DispatchedCardProductProps> = ({
  thumbnail,
  name,
  onError,
}) => {
  return (
    <Card>
      <img
        src={thumbnail}
        alt={name}
        onError={onError}
        className="h-48 w-full object-cover"
      />
      <CardContent>
        <h2 className="text-[16px] font-bold mb-1">{name}</h2>
        <Typography
          variant="body2"
          className="text-[14px] text-green-500 font-semibold"
        >
          Dispatched successfully!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DispatchedCardProduct;

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import defaultImage from "../assets/images/defaultImage.png";

const DispatchedProducts: React.FC = () => {
  const dispatchedProducts = useSelector(
    (state: RootState) => state.products.dispatchedProducts
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Dispatched Products
      </Typography>
      {dispatchedProducts.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No products have been dispatched yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {dispatchedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  onError={handleImageError}
                  className="h-48 w-full object-cover"
                />
                <CardContent>
                  <h2 className="text-[16px] font-bold mb-1">{product.name}</h2>
                  <p className="text-[14px] text-green-500 font-semibold">
                    Dispatched successfully!
                  </p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DispatchedProducts;

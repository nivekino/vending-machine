import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Grid, Container, Typography } from "@mui/material";
import DispatchedCardProduct from "../components/DispatchedCardProduct";
import defaultImage from "../assets/images/defaultImage.png";

const DispatchedProductsContainer: React.FC = () => {
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
              <DispatchedCardProduct
                thumbnail={product.thumbnail}
                name={product.name}
                onError={handleImageError}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DispatchedProductsContainer;

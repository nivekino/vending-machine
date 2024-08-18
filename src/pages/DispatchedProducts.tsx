import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const DispatchedProducts: React.FC = () => {
  const dispatchedProducts = useSelector(
    (state: RootState) => state.products.dispatchedProducts
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dispatched Products
      </Typography>
      {dispatchedProducts.length === 0 ? (
        <Typography variant="body1">
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
                  style={{ height: 140, width: "100%", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Dispatched successfully!
                  </Typography>
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

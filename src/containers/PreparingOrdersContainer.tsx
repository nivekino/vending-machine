import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Container, Typography, Grid } from "@mui/material";
import {
  updateProductPreparation,
  markProductAsDispatched,
} from "../redux/productsSlice";
import { toast } from "react-toastify";
import OrderCardProduct from "../components/OrderCardProduct";

const PreparingOrdersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const preparingOrders = useSelector(
    (state: RootState) => state.products.preparingOrders
  );

  useEffect(() => {
    const activeIntervals: { [key: string]: NodeJS.Timeout } = {};

    preparingOrders.forEach((order) => {
      if (!activeIntervals[order.id] && order.timeLeft > 0) {
        activeIntervals[order.id] = setInterval(() => {
          const currentTimeLeft = order.timeLeft - 1;

          dispatch(
            updateProductPreparation({
              id: order.id,
              timeLeft: currentTimeLeft,
            })
          );

          if (currentTimeLeft <= 0) {
            clearInterval(activeIntervals[order.id]);
            dispatch(markProductAsDispatched(order.id));
            toast.success(
              `Product ${order.product.name} has been dispatched!`,
              {
                position: "bottom-right",
              }
            );
          }
        }, 1000);
      }
    });

    return () => {
      Object.values(activeIntervals).forEach(clearInterval);
    };
  }, [dispatch, preparingOrders]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Preparing Orders
      </Typography>
      {preparingOrders.length > 0 ? (
        <Grid container spacing={4}>
          {preparingOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
              <OrderCardProduct
                productName={order.product.name}
                preparationTime={order.product.preparation_time}
                timeLeft={order.timeLeft}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          There are no orders in preparation yet.
        </Typography>
      )}
    </Container>
  );
};

export default PreparingOrdersContainer;

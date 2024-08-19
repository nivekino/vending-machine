import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  startOrderCountdown,
} from "../redux/productsSlice";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { Button, Container } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const products = await fetchProducts();
        dispatch(fetchProductsSuccess(products));
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch(fetchProductsFailure(err.message));
        } else {
          dispatch(fetchProductsFailure("An unexpected error occurred"));
        }
      }
    };
    getProducts();
  }, [dispatch]);

  const loadMoreProducts = async () => {
    setLoadMoreLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVisibleProducts((prevVisible) =>
      Math.min(prevVisible + 4, products.length)
    );
    setLoadMoreLoading(false);
  };

  const handleOrder = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const orderId = uuidv4();
      toast.info(`Preparing order for ${product.name}!`, {
        position: "bottom-right",
      });
      dispatch(
        startOrderCountdown({
          id: orderId,
          product,
          timeLeft: product.preparation_time,
        })
      );
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {Array.from(new Array(8)).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </Container>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={() => handleOrder(product.id)}
            />
          ))}

          {loadMoreLoading &&
            Array.from(new Array(4)).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
        </div>

        {!loading && !loadMoreLoading && visibleProducts < products.length && (
          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: "12px", textTransform: "none" }}
              onClick={loadMoreProducts}
            >
              Load More
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductList;

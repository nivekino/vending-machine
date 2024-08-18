import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchProductsSuccess,
  markProductAsDispatched,
} from "../redux/productsSlice";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import PreparationModal from "../components/PreparationModal";
import { Button, Container } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [preparingOrders, setPreparingOrders] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        dispatch(fetchProductsSuccess(products));
      } catch (err: any) {
        console.error("Failed to fetch products", err.message);
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

  const handleOrder = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setPreparingOrders((prev) => ({
        ...prev,
        [productId]: product.preparation_time,
      }));

      const interval = setInterval(() => {
        setPreparingOrders((prev) => {
          const newTime = prev[productId] - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            dispatch(markProductAsDispatched(productId));
            toast.success(`Product ${product.name} has been dispatched!`);
            const { [productId]: _, ...remaining } = prev;
            return remaining;
          }
          return { ...prev, [productId]: newTime };
        });
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from(new Array(8)).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {Object.keys(preparingOrders).map((productId) => (
        <PreparationModal
          key={productId}
          open={true}
          preparationTime={preparingOrders[productId]}
          onClose={() => {}}
        />
      ))}
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
      </Container>

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
    </div>
  );
};

export default ProductList;

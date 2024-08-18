import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { Product } from "../interfaces/Product";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import PreparationModal from "../components/PreparationModal";
import { Button } from "@mui/material";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [preparingOrder, setPreparingOrder] = useState<{
    productId: string;
    preparationTime: number;
  } | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

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
      setPreparingOrder({
        productId,
        preparationTime: product.preparation_time,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, product.preparation_time * 1000)
      );
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PreparationModal
        open={!!preparingOrder}
        preparationTime={preparingOrder?.preparationTime ?? 0}
        onClose={() => setPreparingOrder(null)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products
              .slice(0, visibleProducts)
              .map((product) => (
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

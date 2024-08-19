import ProductList from "../containers/ProductListContainer";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-[2.125rem] font-[500] text-center mt-4">
        Choose your favorite product!
      </h1>
      <ProductList />
    </div>
  );
};

export default Home;

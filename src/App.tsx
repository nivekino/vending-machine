import React from "react";
import ProductList from "./containers/ProductListContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-[#9E00FF] p-4 text-white text-center">
        <h1 className="text-3xl">Vending Machine</h1>
      </header>
      <main className="container mx-auto my-8">
        <ProductList />
      </main>
    </div>
  );
};

export default App;

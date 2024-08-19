import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import DispatchedProductsPage from "./pages/DispatchedProductsPage";
import PreparingOrdersPage from "./pages/PreparingOrdersPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container mx-auto mb-8 mt-[10vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dispatched" element={<DispatchedProductsPage />} />
            <Route path="/preparing" element={<PreparingOrdersPage />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

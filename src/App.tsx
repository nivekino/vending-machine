import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import DispatchedProducts from "./pages/DispatchedProducts";
import PreparingOrders from "./pages/PreparingOrders";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container mx-auto mb-8 mt-[10vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dispatched" element={<DispatchedProducts />} />
            <Route path="/preparing" element={<PreparingOrders />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

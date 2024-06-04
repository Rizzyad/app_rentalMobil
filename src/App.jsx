import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionPages from "./pages/TransactionPages";
import DashboardPages from "./pages/DashboardPages";
import CarPages from "./pages/CarPages";
import NotFoundPages from "./pages/NotFoundPages";

const App = () => {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPages />}/>
          <Route path="/transaction" element={<TransactionPages />} />
          <Route path="/car" element={<CarPages />} />
          <Route path="*" element={<NotFoundPages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Cek ini Dashboard</h1>
      <button onClick={() => navigate("/transaction")}>Ke Transaksi</button>
    </>
  );
};

export default Dashboard;

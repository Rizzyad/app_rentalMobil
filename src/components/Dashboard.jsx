import Stats from "./Dashboard/Stats";
import Navbar from "./Transaction/Navbar";

const Dashboard = () => {
  return (
    <>
      <div className="navbar">
        <div className="card flex justify-content-center">
          <Navbar />
        </div>
      </div>
      <br />
      <div className="flex justify-content-center">
        <div className="card">
          <h1>Rental Car</h1>
        </div>
      </div>
      <Stats />
    </>
  );
};

export default Dashboard;

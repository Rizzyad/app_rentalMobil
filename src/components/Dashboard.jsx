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
      <div className="content">
        <div className="flex justify-content-center">
          <h1>Rental Car</h1>
        </div>
        <Stats />
      </div>
    </>
  );
};

export default Dashboard;

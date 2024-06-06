import { tableData } from "../../data/TableData";
import { carData } from "../../data/CarData";
import { formatCurrency } from "../../functions/Functions";

const Stats = () => {
    const totalRevenue = tableData.reduce((total, transaction) => total + transaction.rentalFees, 0);
  return (
    <div className="grid justify-content-center">
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Transaction</span>
              <div className="text-900 font-medium text-xl">{tableData.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">{tableData.length} new </span>
          <span className="text-500">since last visit</span>
        </div>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Revenue</span>
              <div className="text-900 font-medium text-xl">{formatCurrency(totalRevenue)}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-money-bill text-orange-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">%52+ </span>
          <span className="text-500">since last week</span>
        </div>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Cars</span>
              <div className="text-900 font-medium text-xl">{carData.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-car text-cyan-500 text-xl"></i>
            </div>
          </div>
          <span className="text-green-500 font-medium">{carData.length} </span>
          <span className="text-500">newly registered</span>
        </div>
      </div>      
    </div>
  );
};

export default Stats;

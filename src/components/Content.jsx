import { Button } from "primereact/button";

export const header = (
  <div className="flex flex-wrap align-items-center justify-content-between gap-2">
    <span className="text-xl text-900 font-bold">Transaction Data</span>
    <Button icon="pi pi-plus" rounded raised />
  </div>
);

export const footer = `In total there are 0 transaction.`;

export const columns = [
  { field: "no", header: "No" },
  { field: "car", header: "Car" },
  { field: "customer", header: "Customer" },
  { field: "rentalDate", header: "Rental Date" },
  { field: "returnDate", header: "Return Date" },
  { field: "rentalFees", header: "Rental Fees" },
  { field: "action", header: "Action" },
];



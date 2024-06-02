import { Button } from "primereact/button";

export const columns = [
  { field: "id", header: "ID" },
  { field: "car", header: "Car" },
  { field: "customer", header: "Customer" },
  { field: "rentalDate", header: "Rental Date" },
  { field: "returnDate", header: "Return Date" },
  { field: "rentalFees", header: "Rental Fees" },
];

export const tableData = [
  {
    id: 1,
    car: "Avanza",
    customer: "Adi",
    rentalDate: "20/05/2024",
    returnDate: "23/05/2024",
    rentalFees: "100000",
  },
  {
    id: 2,
    car: "Lambo",
    customer: "Eka",
    rentalDate: "25/05/2024",
    returnDate: "30/05/2024",
    rentalFees: "200000",
  },
  {
    id: 3,
    car: "Ferrari",
    customer: "Dian",
    rentalDate: "22/05/2024",
    returnDate: "28/05/2024",
    rentalFees: "700000",
  },
];

export const actionBodyTemplate = (rowData, { handleDelete }) => {
  return (
    <>
      <Button
        icon="pi pi-pen-to-square"
        severity="warning"
        rounded
        raised
        style={{ marginRight: "5px" }}
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        rounded
        raised
        onClick={() => handleDelete(rowData)}
      />
    </>
  );
};

export const header = (
  <div className="flex flex-wrap align-items-center justify-content-between gap-2">
    <span className="text-xl text-900 font-bold">Transaction Data</span>
    <Button icon="pi pi-plus" rounded raised />
  </div>
);

export const Footer = ({ transaction }) => {
  return `In total there are ${transaction ? transaction.length : 0} transaction.`;
};

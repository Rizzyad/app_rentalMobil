import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

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
    car: "Fortuner",
    customer: "Adi",
    rentalDate: "2024-05-20",
    returnDate: "2024-05-23",
    rentalFees: "20000",
  },
  {
    id: 2,
    car: "Aventador",
    customer: "Eka",
    rentalDate: "2024-05-25",
    returnDate: "2024-05-30",
    rentalFees: "60000",
  },
  {
    id: 3,
    car: "Ferrari",
    customer: "Dian",
    rentalDate: "2024-05-22",
    returnDate: "2024-05-28",
    rentalFees: "56000",
  },
];


export const carData = [
  {
    id: 1,
    name: "Fortuner",
    pricePerDay: 5000,
  },
  {
    id: 2,
    name: "Aventador",
    pricePerDay: 10000,
  },
  {
    id: 3,
    name: "Ferrari",
    pricePerDay: 8000,
  },
  {
    id: 4,
    name: "BMW",
    pricePerDay: 7000,
  },
];

export const ActionBodyTemplate = ({ rowData, handleDelete, handleModalEdit }) => {
  const deleteConfirm = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(rowData),
      reject: () => {},
    });
  };

  return (
    <>
      <Button
        icon="pi pi-pen-to-square"
        severity="warning"
        rounded
        raised
        style={{ marginRight: "5px" }}
        onClick={() => handleModalEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        rounded
        raised
        onClick={() => deleteConfirm(rowData)}
      />
    </>
  );
};

export const Header = ({ open }) => {
  return (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Transaction Data</span>
      <Button icon="pi pi-plus" rounded raised onClick={open} />
    </div>
  );
};

export const Footer = ({ transaction }) => {
  return `In total there are ${
    transaction ? transaction.length : 0
  } transaction.`;
};

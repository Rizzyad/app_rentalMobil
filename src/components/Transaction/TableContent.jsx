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

import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TableContent = ({ transaction, open, handleDelete, handleModalEdit }) => {
  const columns = [
    { field: "id", header: "ID" },
    { field: "car", header: "Car" },
    { field: "customer", header: "Customer" },
    { field: "rentalDate", header: "Rental Date" },
    { field: "returnDate", header: "Return Date" },
    { field: "rentalFees", header: "Rental Fees" },
  ];

  const Header = () => {
    return (
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">Transaction Data</span>
        <Button icon="pi pi-plus" rounded raised onClick={open} />
      </div>
    );
  };

  const Footer = () => {
    return `In total there are ${
      transaction ? transaction.length : 0
    } transaction.`;
  };

  const ActionBodyTemplate = (rowData) => {
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
      <DataTable
        value={transaction}
        header={<Header open={open} />}
        footer={<Footer transaction={transaction} />}
        tableStyle={{ minWidth: "60rem" }}
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column
          body={(rowData) => <ActionBodyTemplate rowData={rowData} />}
          header="Action"
        />
      </DataTable>
    </>
  );
};

export default TableContent;

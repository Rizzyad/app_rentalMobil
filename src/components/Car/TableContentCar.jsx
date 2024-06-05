import { formatCurrency } from "../../functions/Functions";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TableContentCar = ({ totalCars, open, handleModalEdit, handleDelete }) => {
  const Header = () => {
    return (
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">Car Data</span>
        <Button icon="pi pi-plus" rounded raised onClick={open} />
      </div>
    );
  };

  const Footer = () => {
    return `In total there are ${
      totalCars ? totalCars.length : 0
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

  const priceBodyTemplate = (totalCars) => {
    return formatCurrency(totalCars.pricePerDay);
  };

  return (
    <>
      <DataTable
        value={totalCars}
        header={<Header open={open} />}
        footer={<Footer totalCars={totalCars} />}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column
          field="pricePerDay"
          header="Price Per Day"
          body={priceBodyTemplate}
        ></Column>
        <Column
          body={(rowData) => <ActionBodyTemplate rowData={rowData} />}
          header="Action"
        />
      </DataTable>
    </>
  );
};

export default TableContentCar;

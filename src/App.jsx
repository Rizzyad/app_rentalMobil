import { items, start } from "./components/Navbar";
import {
  columns,
  Header,
  Footer,
  tableData,
  carData,
  ActionBodyTemplate,
} from "./components/Content";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, TextInput, Modal, NumberInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

function App() {
  const [transaction, setTransaction] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    car: "",
    customer: "",
    rentalDate: "",
    returnDate: "",
    rentalFees: 0,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const toast = useRef(null);

  useEffect(() => {
    setTransaction(tableData);
    setCarsData(carData);
  }, []);

  const handleDelete = (rowData) => {
    setTransaction(transaction.filter((item) => item.id !== rowData.id));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data deleted successfully",
      life: 3000,
    });
  };

  const handleSubmit = () => {
    const { car, customer, rentalDate, returnDate, rentalFees } =
      newTransaction;

    const carUpdated = car.split(":")[0].trim();

    if (!car && !customer && !rentalDate && !returnDate && rentalFees === 0)
      return;

    const newId =
      transaction.length > 0
        ? Math.max(...transaction.map((t) => t.id)) + 1
        : 1;
    const newEntry = {
      id: newId,
      car: carUpdated,
      customer,
      rentalDate: formatDate(rentalDate),
      returnDate: formatDate(returnDate),
      rentalFees,
    };

    setTransaction([...transaction, newEntry]);
    setNewTransaction({
      car: "",
      customer: "",
      rentalDate: "",
      returnDate: "",
      rentalFees: 0,
    });

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data added successfully",
      life: 3000,
    });

    close();
  };

  const handleInputChange = (field, value) => {
    let updatedTransaction = { ...newTransaction, [field]: value };
    if (field === "car") {
      const selectedCar = carsData.find(
        (car) => ` ${car.name}  : ${car.pricePerDay} /day` === value
      );
      if (selectedCar) {
        updatedTransaction.rentalFees = selectedCar.pricePerDay;
      } else {
        updatedTransaction.rentalFees = 0;
      }
    }
    setNewTransaction(updatedTransaction);
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="navbar">
        <div className="card flex justify-content-center">
          <Menubar model={items} start={start} />
          <Modal opened={opened} onClose={close} title="New Transaction">
            <Select
              data-autofocus
              label="Car"
              placeholder="Select the car"
              data={carsData.map(
                (car) => ` ${car.name}  : ${car.pricePerDay} /day`
              )}
              value={newTransaction.car || ""}
              onChange={(value) => handleInputChange("car", value)}
            />
            <TextInput
              label="Name"
              placeholder="input your name"
              value={newTransaction.customer || ""}
              onChange={(event) =>
                handleInputChange("customer", event.target.value)
              }
            />
            <DateInput
              label="Rental Date"
              placeholder="input rental date"
              value={newTransaction.rentalDate || ""}
              onChange={(value) => handleInputChange("rentalDate", value)}
            />
            <DateInput
              label="Finish Date"
              placeholder="input finish date"
              value={newTransaction.returnDate || ""}
              onChange={(value) => handleInputChange("returnDate", value)}
            />
            <NumberInput
              label="Rental Fees"
              placeholder="total rental fees"
              value={newTransaction.rentalFees || ""}
              onChange={(value) => handleInputChange("rentalFees", value)}
              readOnly
            />
            <div className="flex justify-content-end">
              <Button
                variant="filled"
                color="red"
                mr="sm"
                mt="md"
                onClick={close}
              >
                Cancel
              </Button>
              <Button variant="filled" mt="md" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Modal>
          <br />
        </div>
      </div>
      <div className="content">
        <div className="flex justify-content-center">
          <div className="card">
            <h1>Rental Car</h1>
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
                body={(rowData) => (
                  <ActionBodyTemplate
                    rowData={rowData}
                    handleDelete={handleDelete}
                  />
                )}
                header="Action"
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

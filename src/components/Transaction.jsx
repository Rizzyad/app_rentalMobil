import TableContent from "./Transaction/TableContent";
import Navbar from "./Transaction/Navbar";
import { FormModalInsert, FormModalEdit } from "./Transaction/FormModal";
import { calculateDays, formatCurrency, formatDate } from "../functions/Functions";
import { tableData } from "../data/TableData";
import { carData } from "../data/CarData";
import { useState, useEffect, useRef } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    car: "",
    customer: "",
    rentalDate: "",
    returnDate: "",
    rentalFees: 0,
  });
  const [selectedTransaction, setSelectedTransaction] = useState({
    car: "",
    customer: "",
    rentalDate: "",
    returnDate: "",
    rentalFees: 0,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  const toast = useRef(null);

  useEffect(() => {
    setTransaction(tableData);
    setCarsData(carData);
  }, []);

  useEffect(() => {
    if (
      newTransaction.car &&
      newTransaction.rentalDate &&
      newTransaction.returnDate
    ) {
      const selectedCar = carsData.find(
        (car) =>
          ` ${car.name}  : ${formatCurrency(car.pricePerDay)} /day` === newTransaction.car
      );
      if (selectedCar) {
        if (newTransaction.rentalDate > newTransaction.returnDate) {
          setNewTransaction((prevState) => ({
            ...prevState,
            rentalFees: selectedCar.pricePerDay,
          }));
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Finish date cannot be earlier than rental date",
            life: 3000,
          });
          return;
        }

        const rentalDays =
          calculateDays(newTransaction.rentalDate, newTransaction.returnDate) +
          1;
        setNewTransaction((prevState) => ({
          ...prevState,
          rentalFees: selectedCar.pricePerDay * rentalDays,
        }));
      }
    }
  }, [
    newTransaction.car,
    newTransaction.rentalDate,
    newTransaction.returnDate,
    carsData,
  ]);

  useEffect(() => {
    if (
      selectedTransaction.car &&
      selectedTransaction.rentalDate &&
      selectedTransaction.returnDate
    ) {
      const selectedCar = carsData.find(
        (car) =>
          ` ${car.name}  : ${formatCurrency(car.pricePerDay)} /day` === selectedTransaction.car
      );
      if (selectedCar) {
        if (selectedTransaction.rentalDate > selectedTransaction.returnDate) {
          setSelectedTransaction((prevState) => ({
            ...prevState,
            rentalFees: selectedCar.pricePerDay,
          }));
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Finish date cannot be earlier than rental date",
            life: 3000,
          });
          return;
        }

        const rentalDays =
          calculateDays(
            selectedTransaction.rentalDate,
            selectedTransaction.returnDate
          ) + 1;
        setSelectedTransaction((prevState) => ({
          ...prevState,
          rentalFees: selectedCar.pricePerDay * rentalDays,
        }));
      }
    }
  }, [
    selectedTransaction.car,
    selectedTransaction.rentalDate,
    selectedTransaction.returnDate,
    carsData,
  ]);

  const handleModalEdit = ({rowData}) => {
    const selectedTransaction = transaction.find(
      (item) => item.id === rowData.id
    );
    setSelectedTransaction({
      ...selectedTransaction,
      rentalDate: new Date(selectedTransaction.rentalDate), // Konversi string ke Date
      returnDate: new Date(selectedTransaction.returnDate), // Konversi string ke Date
      car: ` ${selectedTransaction.car}  : ${formatCurrency(
        carsData.find((car) => car.name === selectedTransaction.car)
          ?.pricePerDay || 0)
      } /day`,
    });
    open2();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { car, customer, rentalDate, returnDate, rentalFees } =
      newTransaction;

    if (!car || !customer || !rentalDate || !returnDate || rentalFees === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all fields",
        life: 3000,
      });
      return;
    }

    const carUpdated = car.split(":")[0].trim();

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

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const { car, customer, rentalDate, returnDate, rentalFees } =
      selectedTransaction;

    if (!car || !customer || !rentalDate || !returnDate || rentalFees === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all fields",
        life: 3000,
      });
      return;
    }

    const carUpdated = car.split(":")[0].trim();

    const updatedTransaction = transaction.map((t) =>
      t.id === selectedTransaction.id
        ? {
            ...selectedTransaction,
            rentalDate: formatDate(selectedTransaction.rentalDate),
            returnDate: formatDate(selectedTransaction.returnDate),
            car: carUpdated,
          }
        : t
    );

    setTransaction(updatedTransaction);
    setSelectedTransaction({
      car: "",
      customer: "",
      rentalDate: "",
      returnDate: "",
      rentalFees: 0,
    });
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data updated successfully",
      life: 3000,
    });

    close2();
  };

  const handleDelete = ({rowData}) => {
    setTransaction(transaction.filter((item) => item.id !== rowData.id));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data deleted successfully",
      life: 3000,
    });
  };

  const handleInputEdit = (field, value) => {
    if (selectedTransaction) {
      setSelectedTransaction((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleInputChange = (field, value) => {
    let updatedTransaction = { ...newTransaction, [field]: value };

    if (field === "car") {
      const selectedCar = carsData.find(
        (car) => ` ${car.name}  : ${formatCurrency(car.pricePerDay)} /day` === value
      );
      if (selectedCar) {
        updatedTransaction.rentalFees = selectedCar.pricePerDay;
      } else {
        updatedTransaction.rentalFees = 0;
      }
    }

    setNewTransaction(updatedTransaction);
  };

  console.log(selectedTransaction);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="navbar">
        <div className="card flex justify-content-center">
          <Navbar />
          <Modal opened={opened} onClose={close} title="New Transaction">
            <FormModalInsert
              carsData={carsData}
              handleSubmit={handleSubmit}
              newTransaction={newTransaction}
              close={close}
              handleInputChange={handleInputChange}
            />
          </Modal>
          <Modal opened={opened2} onClose={close2} title="Edit Transaction">
            <FormModalEdit
              carsData={carsData}
              handleEditSubmit={handleEditSubmit}
              selectedTransaction={selectedTransaction}
              handleInputEdit={handleInputEdit}
              close2={close2}
            />
          </Modal>
          <br />
        </div>
      </div>
      <div className="content">
        <div className="flex justify-content-center">
          <div className="card">
            <h1>Rental Car</h1>
            <TableContent
              transaction={transaction}
              open={open}
              handleDelete={handleDelete}
              handleModalEdit={handleModalEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;

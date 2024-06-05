import Navbar from "./Transaction/Navbar";
import TableContentCar from "./Car/TableContentCar";
import { carData } from "../data/CarData";
import { FormModalInsert, FormModalEdit } from "./Car/FormModal";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const Car = () => {
  const [totalCars, setTotalCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    pricePerDay: 0,
  });
  const [selectedCar, setSelectedCar] = useState({
    name: "",
    pricePerDay: 0,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  const toast = useRef(null);

  useEffect(() => {
    setTotalCars(carData);
  }, []);

  const handleModalEdit = ({ rowData }) => {
    const selectedCar = totalCars.find((item) => item.id === rowData.id);
    setSelectedCar(selectedCar);
    open2();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, pricePerDay } = newCar;

    if (!name || pricePerDay === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all fields",
        life: 3000,
      });
      return;
    }

    const newId =
      totalCars.length > 0 ? Math.max(...totalCars.map((t) => t.id)) + 1 : 1;
    const newEntry = {
      id: newId,
      name,
      pricePerDay,
    };

    setTotalCars([...totalCars, newEntry]);
    setNewCar({
      name: "",
      pricePerDay: 0,
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

    const { name, pricePerDay } = selectedCar;

    if (!name || pricePerDay === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all fields",
        life: 3000,
      });
      return;
    }

    const updatedCar = totalCars.map((t) =>
      t.id === selectedCar.id ? selectedCar  : t
    );

    setTotalCars(updatedCar);
    setSelectedCar({
      name: "",
      pricePerDay: 0,
    });
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data updated successfully",
      life: 3000,
    });

    close2();
  };

  const handleDelete = ({ rowData }) => {
    setTotalCars(totalCars.filter((item) => item.id !== rowData.id));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data deleted successfully",
      life: 3000,
    });
  };

  const handleInputEdit = (field, value) => {
    if (selectedCar) {
      setSelectedCar((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleInputChange = (field, value) => {
    if (newCar) {
      setNewCar({ ...newCar, [field]: value });
    }
  };  

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="navbar">
        <div className="card flex justify-content-center">
          <Navbar />
          <Modal opened={opened} onClose={close} title="New Transaction">
            <FormModalInsert
              handleSubmit={handleSubmit}
              newCar={newCar}
              close={close}
              handleInputChange={handleInputChange}
            />
          </Modal>
          <Modal opened={opened2} onClose={close2} title="Edit Car">
            <FormModalEdit
              handleEditSubmit={handleEditSubmit}
              selectedCar={selectedCar}
              close2={close2}
              handleInputEdit={handleInputEdit}
            />
          </Modal>
          <br />
        </div>
      </div>
      <div className="content">
        <div className="flex justify-content-center">
          <div className="card">
            <h1>Rental Car</h1>
            <TableContentCar
              totalCars={totalCars}
              handleDelete={handleDelete}
              open={open}
              handleModalEdit={handleModalEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Car;

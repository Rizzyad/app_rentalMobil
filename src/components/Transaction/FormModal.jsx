import { formatCurrency } from "../../functions/Functions";

export const FormModalInsert = ({
  carsData,
  handleSubmit,
  newTransaction,
  close,
  handleInputChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Select
        data-autofocus
        label="Car"
        placeholder="Select the car"
        data={carsData.map((car) => ` ${car.name}  : ${formatCurrency(car.pricePerDay)} /day`)}
        value={newTransaction.car || ""}
        onChange={(value) => handleInputChange("car", value)}
        required
      />
      <TextInput
        label="Name"
        placeholder="input your name"
        value={newTransaction.customer || ""}
        onChange={(event) => handleInputChange("customer", event.target.value)}
        required
      />
      <DateInput
        label="Rental Date"
        placeholder="input rental date"
        value={newTransaction.rentalDate || ""}
        onChange={(value) => handleInputChange("rentalDate", value)}
        required
      />
      <DateInput
        label="Finish Date"
        placeholder="input finish date"
        value={newTransaction.returnDate || ""}
        onChange={(value) => handleInputChange("returnDate", value)}
        required
      />
      <TextInput
        label="Rental Fees"
        placeholder="total rental fees"
        value={formatCurrency(newTransaction.rentalFees) || ""}
        onChange={(value) => handleInputChange("rentalFees", value)}
        readOnly
        required
      />
      <div className="flex justify-content-end">
        <Button variant="filled" color="red" mr="sm" mt="md" onClick={close}>
          Cancel
        </Button>
        <Button variant="filled" mt="md" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export const FormModalEdit = ({
  handleEditSubmit,
  carsData,
  handleInputEdit,
  selectedTransaction,
  close2,
}) => {
  return (
    <form onSubmit={handleEditSubmit}>
      <Select
        data-autofocus
        label="Car"
        placeholder="Select the car"
        data={carsData.map((car) => ` ${car.name}  : ${formatCurrency(car.pricePerDay)} /day`)}
        value={selectedTransaction?.car || ""}
        onChange={(value) => handleInputEdit("car", value)}
        required
      />
      <TextInput
        label="Name"
        placeholder="input your name"
        value={selectedTransaction?.customer || ""}
        onChange={(event) => handleInputEdit("customer", event.target.value)}
        required
      />
      <DateInput
        label="Rental Date"
        placeholder="input rental date"
        value={selectedTransaction?.rentalDate || ""}
        onChange={(value) => handleInputEdit("rentalDate", value)}
        required
      />
      <DateInput
        label="Finish Date"
        placeholder="input finish date"
        value={selectedTransaction?.returnDate || ""}
        onChange={(value) => handleInputEdit("returnDate", value)}
        required
      />
      <TextInput
        label="Rental Fees"
        placeholder="total rental fees"
        value={formatCurrency(selectedTransaction?.rentalFees) || ""}
        onChange={(value) => handleInputEdit("rentalFees", value)}
        readOnly
        required
      />
      <div className="flex justify-content-end">
        <Button variant="filled" color="red" mr="sm" mt="md" onClick={close2}>
          Cancel
        </Button>
        <Button variant="filled" mt="md" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

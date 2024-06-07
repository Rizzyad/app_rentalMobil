

export const FormModalInsert = ({
  handleSubmit,
  newCar,
  close,
  handleInputChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        placeholder="input your Car name"
        value={newCar.name || ""}
        onChange={(event) => handleInputChange("name", event.target.value)}
        required
      />
      <NumberInput
        label="Price Per Day"
        placeholder="input price per day of the car"
        value={newCar.pricePerDay || ""}
        onChange={(value) => handleInputChange("pricePerDay", value)}
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
  handleInputEdit,
  selectedCar,
  close2,
}) => {
  return (
    <form onSubmit={handleEditSubmit}>
      <TextInput
        label="Name"
        placeholder="input your Car name"
        value={selectedCar?.name || ""}
        onChange={(event) => handleInputEdit("name", event.target.value)}
        required
      />
      <NumberInput
        label="Price Per Day"
        placeholder="input price per day of the car"
        value={selectedCar?.pricePerDay || ""}
        onChange={(value) => handleInputEdit("pricePerDay", value)}
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

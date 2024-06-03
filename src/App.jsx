import { items, start } from "./components/Navbar";
import {
  columns,
  Header,
  Footer,
  tableData,
  ActionBodyTemplate,
} from "./components/Content";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [transaction, setTransaction] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const toast = useRef(null);

  useEffect(() => {
    setTransaction(tableData);
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

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        cek modal
      </Modal>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="navbar">
        <div className="card flex justify-content-center">
          <Menubar model={items} start={start} />
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

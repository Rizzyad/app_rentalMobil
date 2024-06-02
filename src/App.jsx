import { items, start } from "./components/Navbar";
import { columns, header, Footer, tableData, actionBodyTemplate } from "./components/Content";
import { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function App() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    setTransaction(tableData);
  }, []);

  const handleDelete = (rowData) => {
    setTransaction(transaction.filter((item) => item.id !== rowData.id));
  };

  return (
    <>
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
              header={header}
              footer={<Footer transaction={transaction}/>}
              tableStyle={{ minWidth: "60rem" }}
            >
              {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
              ))}
              <Column body={(rowData) => actionBodyTemplate(rowData, { handleDelete })} header="Action" />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

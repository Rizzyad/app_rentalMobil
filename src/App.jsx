import { items, start } from "./components/Navbar";
import { columns, header, footer } from "./components/Content";
import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function App() {
  const [transaction, setTransaction] = useState(0);

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
              footer={footer}
              tableStyle={{ minWidth: "60rem" }}
            >
              {columns.map((col, i) => (
                <Column key={col.field} field={col.field} header={col.header} />
              ))}
            </DataTable>
          </div>
        </div>
      </div>


    </>
  );
}

export default App;
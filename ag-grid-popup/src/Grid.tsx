import React, { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { ColDef, ValueGetterParams } from "ag-grid-community";
import { fetchData, Athlete } from "./api";
import RedCellRenderer from "./RedCellRenderer";

const rowDataGetter =  (params: ValueGetterParams) => {
  console.log("params data:" + JSON.stringify(params.data));
  return params.data;
};

const columnDefs: ColDef[] = [
  {
    headerName: "ID",
    field: "id",
    width: 70
  },
  {
    headerName: "Transaction No",
    field: "transactionNo",
    width: 150,
    editable: false
  },
  {
    headerName: "Transaction Type",
    field: "transactionType",
    width: 90,
    minWidth: 50,
    maxWidth: 100,
    editable: false
  },
  {
    headerName: "fundingRule",
    field: "fundingRule",
    
    width: 150,
    cellStyle: () => ({
      display: "flex",
      alignItems: "left",
      justifyContent: "left"
    }),
    cellRendererFramework: RedCellRenderer,
    valueGetter : rowDataGetter
  },
  {
    headerName: "ISIN",
    field: "ISIN",
    width: 90
  },
  {
    headerName: "SafeKeepingAcc",
    field: "SafeKeepingAcc",
    width: 110
  }
];



function Grid() {
  const [rowData, setRowData] = React.useState<Athlete[]>([]);

  React.useEffect(() => {
    fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <div style={{ height: "50%", width: "100%" }} className="ag-theme-balham">
        <AgGridReact
          rowSelection="multiple"
          suppressRowClickSelection
          rowHeight={50}
          columnDefs={columnDefs}
          rowData={rowData}
          // defaultColDef={{
          //   cellStyle: () => ({
          //     display: "flex",
          //     alignItems: "center",
          //     justifyContent: "center"
          //   })
          // }}
        />
      </div>
    </div>
  );
}

export default Grid;

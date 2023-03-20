import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import moment from "moment";

//qty*buyPrice=buyValue
// params.api.applyTransaction({ add: resp.tradeBook });

function TradeBook() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const groupDisplayType = "groupRows";

  console.log(rowData);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Date",
      field: "orderDateTime",
      checkboxSelection: true,
    },
    { headerName: "Symbol", field: "symbol", rowGroup: true },
    {
      headerName: "Quantity",
      field: "tradedQty",
      // hide: true,
      cellStyle: (params) => {
        if (params.data.side === 1) {
          return { color: "white", backgroundColor: "green", width: "100px" };
        } else if (params.data.side === -1) {
          return { color: "white", backgroundColor: "red", width: "100px" };
        }
      },
    },

    {
      headerName: "BuyQty",
      field: "tradedQty",
      valueGetter: (params) => {
        if (params.data?.side === 1) {
          return params.data.tradedQty;
        }
      },
      cellStyle: (params) => {
        if (params.data.side === 1) {
          return { color: "white", backgroundColor: "green", width: "100px" };
        }
      },
    },

    {
      headerName: "Buy",
      field: "tradePrice",
      valueGetter: (params) => {
        if (params.data.side === 1) {
          return params.data.tradePrice;
        }
      },
      cellStyle: (params) => {
        if (params.data.side === 1) {
          return { color: "white", backgroundColor: "green", width: "100px" };
        }
      },
    },
    {
      headerName: "TradeValue(Buy)",
      field: "tradeValue",
      valueGetter: (params) => {
        if (params.data.side === 1) {
          return params.data.tradeValue;
        }
      },
      cellStyle: (params) => {
        if (params.data.side === 1) {
          return { color: "white", backgroundColor: "green", width: "100px" };
        }
      },
    },

    {
      headerName: "SellQty",
      field: "tradedQty",
      valueGetter: (params) => {
        if (params.data.side === -1) {
          return params.data.tradedQty;
        }
      },
      cellStyle: (params) => {
        if (params.data.side === -1) {
          return { color: "white", backgroundColor: "red", width: "100px" };
        }
      },
    },

    {
      headerName: "Sell",
      field: "tradePrice",
      valueGetter: (params) => {
        if (params.data.side === -1) {
          return params.data.tradePrice;
        }
      },
      cellStyle: (params) => {
        if (params.data.side === -1) {
          return { color: "white", backgroundColor: "red", width: "100px" };
        }
      },
    },
    {
      headerName: "TradeValue(Sell)",
      field: "tradeValue",
      valueGetter: (params) => {
        if (params.data.side === -1) {
          return params.data.tradeValue;
        }
      },
      cellStyle: (params) => {
        if (params.data.side === -1) {
          return { color: "white", backgroundColor: "red", width: "100px" };
        }
      },
    },

    { headerName: "TradeValue", field: "tradeValue" },

    {
      headerName: "Buy",
      field: "side",

      valueGetter: (params) => {
        if (params.data.side === 1) {
          return "Buy";
        }
      },
      // hide: true,
    },

    {
      headerName: "Sell",
      field: "side",
      cellStyle: (params) => {
        if (params.data.side === -1) {
          return { backgroundColor: "red", color: "white" };
        }
      },
      valueGetter: (params) => {
        if (params.data.side === -1) {
          return "Sell";
        }
      },
      // hide: true,
    },

    { headerName: "OrderNo", field: "exchangeOrderNo" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      width: 200,
      sortable: true,
      //   editable: true,
      //   flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      // floatingFilter: true,
    };
  }, []);

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  //   const onBtnUpdate = useCallback(() => {
  //     document.querySelector("#csvResult").value =
  //       gridRef.current.api.getDataAsCsv();
  //   }, []);

  const autoGroupColumnDef = {
    headerName: "My Group",
    minWidth: 220,
    cellRendererParams: {
      suppressCount: true,
    },
  };

  const newURL = "https://fyers-historical-data.onrender.com";
  const oldURL = "http://localhost:3001";

  const onGridReady = useCallback((params) => {
    console.log("Ready");
    fetch(`${newURL}/getTradeBook`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.tradeBook);
        setRowData(data.tradeBook);
      });
  }, []);
  return (
    <div className="ag-theme-alpine" style={{ height: "1200px" }}>
      <button onClick={onBtnExport}>Download CSV export file</button>

      <AgGridReact
        rowSelection="multiple"
        suppressRowClickSelection={true}
        rowMultiSelectionWithClick={true}
        ref={gridRef}
        popupParent={popupParent}
        groupDisplayType={groupDisplayType}
        autoGroupColumnDef={autoGroupColumnDef}
        rowData={rowData}
        colWidth="200"
        columnDefs={columnDefs}
        animateRows={true}
        suppressExcelExport={true}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}

export default TradeBook;

import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import moment, { min } from "moment";

function Data2() {
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [options, setOptions] = useState({
    symbol: "NSE:NIFTYBANK-INDEX",
    timeframe: "1",
  });

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Date",
      field: "0",
      valueGetter: (params) => {
        return convertMoment(params.data[0]);
      },
    },
    {
      headerName: "Open",
      field: "1",
      valueGetter: (params) => {
        return round(params.data[1]);
      },
    },

    {
      headerName: "High",
      field: "2",
      valueGetter: (params) => {
        return round(params.data[2]);
      },
    },
    {
      headerName: "Low",
      field: "3",
      valueGetter: (params) => {
        return round(params.data[3]);
      },
    },

    {
      headerName: "Close",
      field: "4",
      valueGetter: (params) => {
        return round(params.data[4]);
      },
    },
    {
      headerName: "Range",
      valueGetter: (params) => {
        return round(params.data[2] - params.data[3]);
      },
    },
  ]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const { symbol, timeframe } = options;
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const URL = `http://localhost:3000/history?symbol=${symbol}&timeframe=${timeframe}`;
  const onGridReady = useCallback((params) => {
    console.log("Ready");
    fetch(URL)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.candles);
        setRowData(data.candles);
      });
  }, []);

  function round(val) {
    const roundNumber = val.toFixed(2);
    return roundNumber;
  }

  function convertMoment(val) {
    const day = moment.unix(val);
    return day.format("DD-MM-YYYY\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0hh:mm A");
  }
  return (
    <div style={containerStyle}>
      <div className="ag-theme-alpine" style={{ height: "1200px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rowData}
          defaultColDef={defaultColDef}
          ref={gridRef}
          popupParent={popupParent}
          suppressExcelExport={true}
          animateRows={true}
        ></AgGridReact>
        <button onClick={onBtnExport}>Download CSV export file</button>
      </div>
    </div>
  );
}

export default Data2;

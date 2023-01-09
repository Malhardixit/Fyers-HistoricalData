import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import moment, { min } from "moment";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@material-ui/core";

function Data2() {
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [options, setOptions] = useState({
    symbol: "",
    timeframe: "",
    From: "",
    To: "",
  });
  // NSE: NIFTYBANK - INDEX;

  console.log("options", options);
  const btnstyle = { margin: "8px 0" };

  const [error, setError] = useState(false);

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
    {
      headerName: "Volume",
      valueGetter: (params) => {
        return params.data[5];
      },
    },

    /* {
      headerName: "Buy Above 60% of Range",
      valueGetter: (params) => {
        return round(
          params.data[3] + (params.data[2] - params.data[3]) * 0.618
        );
      },
    }, 
     {
      headerName: "Buy Tgt 1",
      valueGetter: (params) => {
        return round(
          params.data[3] + (params.data[2] - params.data[3]) * 1.618
        );
      },
    },
    {
      headerName: "Buy Tgt 2",
      valueGetter: (params) => {
        return round(
          params.data[3] + (params.data[2] - params.data[3]) * 2.618
        );
      },
    },
    {
      headerName: "Buy Tgt 3",
      valueGetter: (params) => {
        return round(
          params.data[3] + (params.data[2] - params.data[3]) * 3.618
        );
      },
    },
    {
      headerName: "Buy Tgt 4",
      valueGetter: (params) => {
        return round(
          params.data[3] + (params.data[2] - params.data[3]) * 4.236
        );
      },
    },
    {
      headerName: "Sell Below",
      valueGetter: (params) => {
        return round(
          params.data[2] - (params.data[2] - params.data[3]) * 0.618
        );
      },
    },
    {
      headerName: "Sell Tgt 1",
      valueGetter: (params) => {
        return round(
          params.data[2] - (params.data[2] - params.data[3]) * 1.618
        );
      },
    },
    {
      headerName: "Sell Tgt 2",
      valueGetter: (params) => {
        return round(
          params.data[2] - (params.data[2] - params.data[3]) * 2.618
        );
      },
    },
    {
      headerName: "Sell Tgt 3",
      valueGetter: (params) => {
        return round(
          params.data[2] - (params.data[2] - params.data[3]) * 3.618
        );
      },
    },
    {
      headerName: "Sell Tgt 4",
      valueGetter: (params) => {
        return round(
          params.data[2] - (params.data[2] - params.data[3]) * 4.236
        );
      },
    },

    {
      headerName: "Buy Stop Loss",
      valueGetter: (params) => {
        return round(
          params.data[2] - (params.data[2] - params.data[3]) * 0.618 //SELL BELOW
        );
      },
    },
    {
      headerName: "Sell Stop Loss",
      valueGetter: (params) => {
        return round(
          params.data[3] + (params.data[2] - params.data[3]) * 0.618 //BUY ABOVE
        );
      },
    },

    {
      headerName: "Buy Trigger",
      valueGetter: (params) => {
        console.log();
      },
    }, */
  ]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const { symbol, timeframe, From, To } = options;
  // const From = "2022-07-28";
  // const To = "2022-07-28";
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const newURL = "https://fyers-historical-data.onrender.com";
  const oldURL = "http://localhost:3000";

  const URL = `${newURL}/history?symbol=${symbol}&timeframe=${timeframe}&From=${From}&To=${To}`;

  console.log(URL);

  const onGridReady2 = () => {
    console.log("Ready");
    try {
      fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Working!!!!", data.candles);
          setRowData(data.candles);
        });
    } catch (e) {
      console.log(e);
    }
  };

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
      <button onClick={onBtnExport}>Download CSV export file</button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <TextField
            style={{ margin: "8px 0" }}
            type="date"
            helperText="From"
            FormHelperTextProps={{
              style: { fontSize: "20px", color: "Black" },
            }}
            value={From}
            onChange={(e) => {
              setOptions({ ...options, From: e.target.value });
            }}
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <TextField
            style={{ margin: "8px 0" }}
            type="date"
            value={To}
            FormHelperTextProps={{
              style: { fontSize: "20px", color: "Black" },
            }}
            onChange={(e) => {
              setOptions({ ...options, To: e.target.value });
            }}
            helperText="To"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div style={{ marginTop: "-30px", marginLeft: "10px" }}>
          <TextField
            style={{ margin: "8px 0" }}
            label="Symbol"
            value={symbol.trim()}
            onChange={(e) => {
              setOptions({ ...options, symbol: e.target.value });
            }}
            placeholder="Symbol"
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
            style={{ marginTop: "-30px", marginLeft: "10px", width: "180px" }}
          >
            <InputLabel
              style={{
                marginLeft: "12px",
                marginTop: "-4px",
              }}
              id="time"
            >
              TimeFrame*
            </InputLabel>
            <Select
              labelId="time"
              id="demo-simple-select"
              value={timeframe}
              label="TimeFrame"
              onChange={(e) => {
                setOptions({ ...options, timeframe: e.target.value });
              }}
              variant="outlined"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="60">60</MenuItem>
              <MenuItem value="120">120</MenuItem>
              <MenuItem value="240">240</MenuItem>
              <MenuItem value="1D">1D</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          disabled={
            options.symbol === "" || options.timeframe === "" ? true : false
          }
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={() => {
            onGridReady2();
          }}
        >
          Submit
        </Button>
        <div style={{ marginLeft: "50px" }}>
          <Button
            disabled={
              (options.From ||
                options.To ||
                options.symbol ||
                options.symbol ||
                options.timeframe) === ""
                ? true
                : false
            }
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            onClick={() => {
              setOptions({
                symbol: "",
                timeframe: "",
                From: "",
                To: "",
              });
              setRowData([]);
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: "1200px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady2}
          rowData={rowData}
          defaultColDef={defaultColDef}
          ref={gridRef}
          popupParent={popupParent}
          suppressExcelExport={true}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Data2;

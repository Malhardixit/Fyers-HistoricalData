import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function Data() {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState({
    symbol: "",
    timeframe: "",
  });

  const [fromSelectedDate, setFromSelectedDate] = useState("");
  const [toSelectedDate, setToSelectedDate] = useState("");

  const { symbol, timeframe } = options;

  const URL = `http://localhost:3000/history?symbol=${symbol}&timeframe=${timeframe}`;
  const getData = () => {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data.candles);
        if (symbol && timeframe) {
          setData(res.data.candles);
        } else {
          setData(null);
          console.log("No data");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  function round(val) {
    const roundNumber = val.toFixed(2);
    return roundNumber;
  }

  function convertMoment(val) {
    const day = moment.unix(val);
    return day.format("DD-MM-YYYY\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0h:mm A");
  }
  {
    /*  <DatePicker
            selected={fromSelectedDate}
            onChange={(date) => setFromSelectedDate(date)}
            strictParsing={false}
            dateFormat="yyyy-MM-dd"
            isClearable={true}
            useAdditionalDayOfYearTokens={true}
            showYearDropdown
            scrollableMonthYearDropdown
          />; */
  }

  return (
    <div>
      {/* From:
      <input
        type="date"
        value={fromSelectedDate}
        onChange={(date) =>
          setFromSelectedDate(moment(date).format("YYYY-MM-DD"))
        }
      />
      To:{" "}
      <input
        type="date"
        value={toSelectedDate}
        onChange={(date) =>
          setToSelectedDate(moment(date).format("YYYY-MM-DD"))
        }
      /> */}
      <h1>Historical Data for {symbol}</h1>
      <form>
        <label>
          Enter The Symbol:
          <input
            type="text"
            name="symbol"
            value={options.symbol}
            onChange={(e) => setOptions({ ...options, symbol: e.target.value })}
          />
          Enter The Time Frame:
          <input
            type="text"
            name="timeframe"
            value={options.timeframe}
            onChange={(e) =>
              setOptions({ ...options, timeframe: e.target.value })
            }
          />
        </label>
      </form>
      <div>
        <h1
          style={{
            display: "flex",
            width: "100%",
            marginLeft: "40px",
            position: "absolute",
            top: "15.8%",
          }}
        >
          Date
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            border: "1px solid black",
          }}
        >
          <h1>Time</h1>
          <h1 style={{ marginLeft: "-80px" }}>Open</h1>
          <h1>High</h1>
          <h1 style={{ marginLeft: "10px" }}>Low</h1>
          <h1>Close</h1>
          <h1>Range</h1>
        </div>
      </div>
      <div>
        {<button onClick={getData}>Get Data</button>}

        {data?.map((item, index) => {
          return (
            <div key={index}>
              <ul
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <li
                  style={{
                    listStyleType: "none",
                  }}
                >
                  {convertMoment(item[0])}
                </li>
              </ul>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  border: "1px solid black",
                }}
              >
                <h1
                  style={{
                    fontSize: "20px",
                    marginLeft: "10%",
                  }}
                >
                  {round(item[1])}
                </h1>
                <h1
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {round(item[2])}
                </h1>

                <h1 style={{ fontSize: "20px" }}>{round(item[3])}</h1>
                <h1 style={{ fontSize: "20px" }}>{round(item[4])}</h1>
                <h1 style={{ fontSize: "20px" }}>{round(item[2] - item[3])}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Data;

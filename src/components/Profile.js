import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [info, setInfo] = useState([]);

  const newURL = "https://fyers-historical-data.onrender.com";
  const oldURL = "http://localhost:3000";

  function getData() {
    axios.get(`${newURL}/profile`).then((res) => {
      console.log(res.data.data);
      setInfo(res.data.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>Profile Page </h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email Id</th>
            <th>Client Id</th>
            <th>Mobile No</th>
          </tr>
          <tr>
            <td>{info.name}</td>
            <td>{info.email_id}</td>
            <td>{info.fy_id}</td>
            <td>{info.mobile_number}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;

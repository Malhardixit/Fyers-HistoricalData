import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
// import { url } from "./config";
import dotenv from "dotenv";

dotenv.config();

const Login = () => {
  // const URL = url;
  const newURL = process.env.URL;
  const paperStyle = {
    padding: 30,
    height: "45vh",
    width: 280,
    margin: "20px auto",
  };

  const [options, setOptions] = useState({
    authCode: "",
  });

  const { authCode, authToken } = options;

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          style={{ margin: "8px 0" }}
          label="AuthCode"
          value={authCode}
          onChange={(e) => {
            setOptions({ ...options, authCode: e.target.value });
          }}
          placeholder="Enter Auth Code"
          variant="outlined"
          fullWidth
          required
        />
        {/* <TextField
          label="TokenCode"
          value={authToken}
          onChange={(e) => {
            setOptions({ ...options, authToken: e.target.value });
          }}
          placeholder="Enter password"
          variant="outlined"
          fullWidth
          required
        /> */}
        {/*  <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"

        /> */}
        <Button
          type="submit"
          disabled={authCode.length === 0}
          onClick={() => {
            window.open(
              ` http://localhost:3000/setAuthToken?authCode=${authCode}`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          <Link href={newURL} target="_blank">
            Click on the link to get the auth code
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;

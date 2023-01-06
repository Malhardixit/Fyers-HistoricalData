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

const Login = () => {
  const url =
    "https://api.fyers.in/api/v2/generate-authcode?client_id=N6SQYBCH90-100&redirect_uri=https://fyers-historical-data.onrender.com/login&response_type=code&state=sample_state";

  const paperStyle = {
    padding: 30,
    height: "45vh",
    width: 280,
    margin: "20px auto",
  };

  const [options, setOptions] = useState({
    authCode: "",
  });

  const { authCode } = options;

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
        <Button
          type="submit"
          disabled={authCode.length === 0}
          onClick={() => {
            window.open(
              `https://fyers-historical-data.onrender.com/setAuthToken?authCode=${authCode}`,
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
          <Link href={url} target="_blank">
            Click on the link to get the auth code
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;

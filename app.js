const express = require("express");
const app = express();
const fyers = require("fyers-api-v2");
// const config = require("./config");
const session = require("express-session");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");

dotenv.config();

fyers.setAppId("N6SQYBCH90-100");
fyers.setRedirectUrl("https://fyers-historical-data.onrender.com");

// fyers.generateAuthCode();

app.set("view engine", "ejs");
// app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.render("authToken", { url: req.query.auth_code });
});

app.get("/setAuthToken", async (req, res) => {
  const reqBody = {
    auth_code: req.query.authCode,
    secret_key: "A7BAUF3IVG",
    client_id: "N6SQYBCH90-100",
  };

  console.log(reqBody.auth_code);

  const r1 = await fyers.generate_access_token(reqBody);
  try {
    console.log(r1);
    if (r1) {
      const item = r1.access_token;
      console.log("Token", item);

      fyers.setAccessToken(item);
      res.header("Access-Control-Allow-Origin", "*");
      res.render("accessToken", {
        token: r1.s == "error" ? r1.message : r1.access_token,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/profile", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const profile = await fyers.get_profile();
  if (profile) {
    console.log(profile);
    res.send(profile);
  }

  // await fyers.get_profile().then((response) => {
  //   console.log(response);
  //   res.send(response);
  // });
});

// const symbol = "NSE:NIFTYBANK-INDEX";
// 2022 - 07 - 25;
// 2022 - 07 - 26;
app.get("/history", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  async function getHistory() {
    let history = new fyers.history();
    try {
      let result = await history
        .setSymbol(req.query.symbol)
        .setResolution(req.query.timeframe)
        .setDateFormat(1)
        .setRangeFrom(req.query.From)
        .setRangeTo(req.query.To)
        .getHistory();

      console.log(result);
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  }

  getHistory();
});

app.get("/mktDepth", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  async function marketDepth() {
    let marketDepth1 = new fyers.marketDepth();
    let result = await marketDepth1
      .setSymbol("NSE:SBIN-EQ")
      .setOhlcvFlag(1)
      .getMarketDepth();
    // console.log(JSON.stringify(result));
    res.send(result);
  }
  marketDepth();
});

app.get("/getTradeBook", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fyers.get_tradebook().then((response) => {
    console.log(response);
    res.send(response);
  });
});

app.get("/hello", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello World");
});

import "./App.css";
import Data from "./components/Data";
import Data2 from "./components/Data2";
import Login from "./components/Login";
import TradeBook from "./components/TradeBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/data" element={<Data2 />} />
      <Route path="/book" element={<TradeBook />} />
    </Routes>
  );
}

export default App;

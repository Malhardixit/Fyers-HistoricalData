import "./App.css";
import Data from "./components/Data";
import Data2 from "./components/Data2";
import Login from "./components/Login";
import TradeBook from "./components/TradeBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Menu from "./components/Menu";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/data" element={<Data2 />} />
      <Route path="/book" element={<TradeBook />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

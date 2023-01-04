import React from "react";

function Menu() {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/data";
        }}
      >
        Go to Data
      </button>

      <button
        onClick={() => {
          window.location.href = "/book";
        }}
      >
        Go to TradeBook
      </button>

      <button
        onClick={() => {
          window.location.href = "/profile";
        }}
      >
        Go to Profile
      </button>
    </div>
  );
}

export default Menu;

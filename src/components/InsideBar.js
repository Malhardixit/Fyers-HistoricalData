import React from "react";

function InsideBar() {
  //Code for Inside Bar
  function InsideBar() {
    var data = this.props.data;
    var dataLength = data.length;
    var insideBar = [];
    for (var i = 0; i < dataLength; i++) {
      if (data[i].high < data[i - 1].high && data[i].low > data[i - 1].low) {
        insideBar.push(data[i]);
      }
    }
    return insideBar;
  }
  return <div></div>;
}

export default InsideBar;

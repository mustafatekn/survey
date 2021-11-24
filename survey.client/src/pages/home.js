import React from "react";
import NavigationBar from "../components/NavigationBar";

export default function home() {
  return (
    <header id="header-img">
      <NavigationBar />
      <div className="container-fluid p-0 ">
          <div className="d-flex align-items-center">
              <h1 className="display-3 ">Vote to change the future</h1>
          </div>
      </div>
    </header>
  );
}

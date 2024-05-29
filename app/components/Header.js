import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import HeaderLogOut from "./HeaderLogOut";
import HeaderLogIn from "./HeaderLogIn";

import StateContext from "../StateContext";

function Header() {
  const appState = useContext(StateContext);

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            ComplexApp{" "}
          </Link>
        </h4>
        {appState.loggedIn ? <HeaderLogIn /> : <HeaderLogOut />}
      </div>
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import HeaderLogOut from "./HeaderLogOut";
import HeaderLogIn from "./HeaderLogIn";

function Header() {
  const [loggedIn, setLogIn] = useState();

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            ComplexApp{" "}
          </Link>
        </h4>
        {loggedIn ? (
          <HeaderLogIn setLogIn={setLogIn} />
        ) : (
          <HeaderLogOut setLogIn={setLogIn} />
        )}
      </div>
    </header>
  );
}

export default Header;

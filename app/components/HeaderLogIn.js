import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function HeaderLogIn() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleSignOut() {
    appDispatch({ type: "logout" });
  }

  function searchCall(e) {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a
        onClick={searchCall}
        href="#"
        className="text-white mr-2 header-search-icon"
        data-tooltip-content="Search"
        data-tooltip-id="search"
      >
        <i className="fas fa-search"></i>
      </a>
      <Tooltip id="search" className="custom-tooltip" place="bottom" />{" "}
      <span
        className="mr-2 header-chat-icon text-white"
        data-tooltip-content="Chat"
        data-tooltip-id="chat"
      >
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Tooltip id="chat" className="custom-tooltip" place="bottom" />{" "}
      <Link
        to={`/profile/${appState.user.username}`}
        className="mr-2"
        data-tooltip-id="profile"
        data-tooltip-content="Profile"
      >
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <Tooltip id="profile" className="custom-tooltip" place="bottom" />{" "}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{" "}
      <button onClick={handleSignOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLogIn;

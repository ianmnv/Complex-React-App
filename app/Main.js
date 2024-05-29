import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

// My components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessage from "./components/FlashMessage";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function Main() {
  const initialValue = {
    loggedIn: localStorage.getItem("complexappToken") ? true : false,
    flashMsg: [],
  };

  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMsg: state.flashMsg };
      case "logout":
        return { loggedIn: false, flashMsg: state.flashMsg };
      case "flashMsg":
        return {
          loggedIn: state.loggedIn,
          flashMsg: state.flashMsg.concat(action.value),
        };
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialValue);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessage message={state.flashMsg} />
          <Header />

          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/posts/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/About-us" element={<About />} />
            <Route path="/Terms" element={<Terms />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}

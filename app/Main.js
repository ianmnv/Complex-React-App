import React, { useState } from "react";
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

function Main() {
  const [loggedIn, setLogIn] = useState(
    localStorage.getItem("complexappToken") ? true : false
  );
  // Brad did it this way
  // const [loggedIn, setLogIn] = useState(
  //   Boolean(localStorage.getItem("complexappToken"))
  // );
  const [flashMsg, setFlashMsg] = useState([]);

  function addFlashMessage(msg) {
    setFlashMsg((prev) => prev.concat(msg));
  }

  return (
    <BrowserRouter>
      <FlashMessage message={flashMsg} />
      <Header loggedIn={loggedIn} setLogIn={setLogIn} />

      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/posts/:id" element={<ViewSinglePost />} />
        <Route
          path="/create-post"
          element={<CreatePost addMessage={addFlashMessage} />}
        />
        <Route path="/About-us" element={<About />} />
        <Route path="/Terms" element={<Terms />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}

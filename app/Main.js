import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// My components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";

function Main() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomeGuest />} />
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

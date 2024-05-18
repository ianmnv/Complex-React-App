import React from "react";
import ReactDOM from "react-dom/client";

function OurApp() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>The sky is blue!!!</p>
      <p>But my biggest goal is to be with you</p>
      <footer>Copyright</footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<OurApp />);

if (module.hot) {
  module.hot.accept();
}

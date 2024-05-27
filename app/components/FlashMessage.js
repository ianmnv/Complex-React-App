import React, { useEffect, useState } from "react";

function FlashMessage(props) {
  return (
    <div className="floating-alerts">
      {props.message.map((msg, i) => {
        return (
          <div
            key={i}
            className="alert alert-success text-center floating-alert shadow-sm"
          >
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessage;

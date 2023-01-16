import React from "react";

export default function ToastComponent(props) {
  return (
    <div className="flex justify-center">
      <div id="toast">
        <p id="toast-text" className="mb-0"></p>
      </div>
    </div>
  );
}

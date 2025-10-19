import React from "react";

const ActionButton = ({ handleSignUp, isFormValid, text }) => (
  <button
    className={`w-full rounded-md py-3 mt-5 text-white ${
      isFormValid ? "bg-btn-bg" : "bg-btn-ds"
    }`}
    onClick={handleSignUp}
    disabled={!isFormValid}
  >
    {text}{" "}
  </button>
);

export default ActionButton;

"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const ConfirmPasswordInput = ({
  confirmPassword,
  setConfirmPassword,
  password,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState(false);
  const isConfirmValid = confirmPassword === password;

  return (
    <div className="w-full max-w-full px-0 mt-4  relative">
      <label className="block text-sm font-bold text-t-gray mb-1">
        Confirm Password
      </label>

      <input
        type={showConfirm ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Type your password again"
        className="w-full px-4 py-2.5 pr-12 border border-border rounded-md text-sm outline-none placeholder:text-placeholder"
        autoComplete="off"
      />

      <button
        type="button"
        onClick={() => setShowConfirm(!showConfirm)}
        className="absolute right-5 top-8 text-t-gray"
      >
        {showConfirm ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>

      {touched && !isConfirmValid && (
        <p className="text-sm text-red-500 mt-2">Should match the password.</p>
      )}
    </div>
  );
};

export default ConfirmPasswordInput;

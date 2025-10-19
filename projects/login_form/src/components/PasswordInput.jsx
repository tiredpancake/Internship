"use client";
import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

const PasswordInput = ({
  password,
  setPassword,
  passwordError = "",
  setPasswordError = () => {},
  rules = [],
  showRules = false,
  label = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  return (
    <div className="w-full max-w-full px-0 mt-4 relative ">
      <label
        htmlFor="password"
        className="block text-sm font-bold text-t-gray mb-1 text-left"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={onChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2.5 pr-12 border border-border rounded-md text-sm outline-none placeholder:text-placeholder"
          autoComplete="off"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-3 text-t-gray"
        >
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* password error (login) */}
      {passwordError && (
        <p className="text-sm text-red-500 mt-2">{passwordError}</p>
      )}

      {/* optional rules checklist (signup) */}
      {showRules && rules.length > 0 && (
        <ul className="mt-3 space-y-1">
          {rules.map((rule) => {
            const passed = rule.test(password);
            return (
              <li key={rule.id} className="flex items-start gap-2">
                {passed ? (
                  <CheckCircleIcon className="w-5 h-5 text-marker" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-gray-400" />
                )}
                <span
                  className={`text-sm ${
                    passed ? "text-marker font-semibold" : "text-gray-500"
                  }`}
                >
                  {rule.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PasswordInput;

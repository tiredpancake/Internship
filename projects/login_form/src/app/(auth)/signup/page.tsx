"use client";
import React, { useState } from "react";
import countries from "../../../data/countries.json";
import OTPPage from "../otp/page";
import Header from "../../../components/Header";
import CountrySelector from "../../../components/CountrySelector";
import PasswordInput from "../../../components/PasswordInput";
import ConfirmPasswordInput from "./_components/ConfirmPasswordInput";
import TermsCheckbox from "./_components/TermsCheckbox";
import ActionButton from "../../../components/ActionButton";
import AuthRedirect from "../../../components/AuthRedirect";

const SignUpPage = () => {
  const [selected, setSelected] = useState(countries[98]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const isPhoneValid = /^\d{10}$/.test(phone);
  const isConfirmValid = confirmPassword === password;

  const passwordRules = [
    {
      id: "length",
      label: "At least 8 characters",
      test: (p) => p.length >= 8,
    },
    {
      id: "uppercase",
      label: "One uppercase letter",
      test: (p) => /[A-Z]/.test(p),
    },
    { id: "number", label: "One number", test: (p) => /\d/.test(p) },
    {
      id: "special",
      label: "One special character",
      test: (p) => /[!@#$%^&*]/.test(p),
    },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.test(password));
  const isFormValid =
    isPhoneValid && isPasswordValid && agreed && isConfirmValid;

  const handleSignUp = () => {
    setRegisterError("");
    if (!isFormValid) return;

    const newUser = {
      country: selected.name,
      dialCode: selected.dial_code,
      phone,
      password,
    };

    const saved = localStorage.getItem("users");
    const users = saved ? JSON.parse(saved) : [];
    const isExisted = users.some(
      (u) => u.phone === phone && u.dialCode === selected.dial_code
    );

    if (isExisted) {
      setRegisterError("User already registered.");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setShowOtpPage(true);
  };

  if (showOtpPage) {
    return (
      <OTPPage
        phone={phone}
        mode="signup"
        onGoBack={() => setShowOtpPage(false)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-10 lg:p-24">
      <Header title="Sign up" subtitle="Enter your details to sign up" />
      <CountrySelector
        countries={countries}
        selected={selected}
        setSelected={setSelected}
        phone={phone}
        setPhone={setPhone}
        registerError={registerError}
        setRegisterError={setRegisterError}
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        rules={passwordRules}
        showRules={true}
      />
      <ConfirmPasswordInput
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        password={password}
      />
      <div className="w-full flex justify-start  ">
        <TermsCheckbox agreed={agreed} setAgreed={setAgreed} />
      </div>
      <ActionButton
        text={"sign up"}
        handleSignUp={handleSignUp}
        isFormValid={isFormValid}
      />
      <AuthRedirect
        text="Already have an account?"
        linkText="Sign In"
        linkHref="/login"
      />
    </div>
  );
};

export default SignUpPage;

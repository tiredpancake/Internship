"use client";
import React, { useState } from "react";
import countries from "../../../data/countries.json";
import OTPPage from "../otp/page";
import Header from "../../../components/Header";
import CountrySelector from "../../../components/CountrySelector";
import PasswordInput from "../../../components/PasswordInput";
import ActionButton from "../../../components/ActionButton";
import AuthRedirect from "../../../components/AuthRedirect";

const Page = () => {
  const [selected, setSelected] = useState(countries[98]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const passwordRules = [
    {
      id: "length",
      label: "Password must contain at least 8 characters",
      test: (p: string) => p.length >= 8,
    },
    {
      id: "uppercase",
      label: " Password must contain one uppercase letter",
      test: (p: string) => /[A-Z]/.test(p),
    },
    {
      id: "number",
      label: "Password must contain one number",
      test: (p: string) => /\d/.test(p),
    },
    {
      id: "special",
      label: "Password must contain one special character",
      test: (p: string) => /[!@#$%^&*]/.test(p),
    },
  ];

  const isPhoneValid = /^\d{10}$/.test(phone);
  const isPasswordValid = passwordRules.every((rule) => rule.test(password));
  const isFormValid = isPhoneValid && isPasswordValid;

  if (showOtpPage) {
    return (
      <OTPPage
        phone={phone}
        mode="login"
        onGoBack={() => setShowOtpPage(false)}
      />
    );
  }

  const handleLogIn = () => {
    setPasswordError("");
    setPhoneError("");
    const saved = localStorage.getItem("users");
    if (!saved) {
      setPhoneError("This account is not registered.");
      return;
    }
    const users = JSON.parse(saved);
    const isRegistered = users.find(
      (u) => u.phone === phone && u.dialCode === selected.dial_code
    );
    if (!isRegistered) {
      setPhoneError("This account is not registered.");
      return;
    }
    if (isRegistered.password !== password) {
      setPasswordError("password is incorrect.");
      return;
    }
    setShowOtpPage(true);
  };

  return (
    <div className=" flex justify-center items-center p-10 flex-col  lg:p-34 ">
      <Header
        title="Login with mobile number"
        subtitle="Please confirm your country code and enter your mobile number"
      />
      <CountrySelector
        countries={countries}
        selected={selected}
        setSelected={setSelected}
        phone={phone}
        setPhone={setPhone}
        registerError={phoneError}
        setRegisterError={setPhoneError}
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        showRules={false} // default can be false
      />
      <ActionButton
        text={"Send otp"}
        handleSignUp={handleLogIn}
        isFormValid={isFormValid}
      />
      <AuthRedirect
        text="Don't have an account yet?"
        linkText="Sign Up"
        linkHref="/signup"
      />
    </div>
  );
};

export default Page;

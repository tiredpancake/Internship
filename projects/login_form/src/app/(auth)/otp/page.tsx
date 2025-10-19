"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignUp from "../signup/page";
import Login from "../login/page";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../../components/Header";
import AuthRedirect from "../../../components/AuthRedirect";

const Page = ({
  phone,
  mode,
  onGoBack,
}: {
  phone: string;
  mode: "signup" | "login";
  onGoBack: () => void;
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  console.log(mode);
  const getOtpValue = () => {
    return inputsRef.current.map((input) => input?.value).join("");
  };
  const [otpError, setOtpError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      e.target.value = value;
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      if (!e.currentTarget.value && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = getOtpValue();

    if (enteredOTP === "1234") {
      if (mode == "login") toast.success(" LoggedIn successfully!");
      else if (mode == "signup") toast.success("SignUP successfully!");
    } else {
      setOtpError("Incorrect code .");
    }
  };

  return (
    <div className="flex justify-center items-center p-10 flex-col lg:p-24">
      <Header
        title="Enter OTP"
        subtitle="We have sent a OTP to your mobile number"
      />

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-1 md:gap-3 mt-6 flex-nowrap">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <input
                type="text"
                maxLength={1}
                ref={(el) => (inputsRef.current[i] = el!)}
                onChange={(e) => {
                  handleChange(e, i);
                  setOtpError("");
                }}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 md:w-20 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {i < 3 && (
                <span className="mx-2 text-gray-400 text-xl select-none">
                  -
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-full   lg:px-0 mt-5 ">
          {otpError && (
            <p className="text-sm text-red-500 mb-2 -mt-1 ">{otpError}</p>
          )}
        </div>
        <div className=" w-full max-w-full px-0 mt-1  relative lg:px-0">
          <button
            className={`relative w-full flex-grow bg-btn-bg text-white rounded-md py-3 mt-5`}
            onClick={handleVerify}
          >
            Verify{" "}
          </button>
        </div>
      </div>
      <AuthRedirect
        text="Didn’t receive code?"
        linkText="Resend OTP"
        linkHref="/tep"
      />

      <button
        onClick={onGoBack}
        className="mt-7 text-t-purple font-semibold text-md cursor-pointer"
      >
        Change Number
      </button>
    </div>
  );
};

export default Page;

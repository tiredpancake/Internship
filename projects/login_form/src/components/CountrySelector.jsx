"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const CountrySelector = ({
  countries,
  selected,
  setSelected,
  phone,
  setPhone,
  registerError = "", // optional
  setRegisterError = () => {}, // optional
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-full">
      <div className="flex flex-row mt-4 gap-2.5 relative">
        <button
          onClick={() => setExpand(!expand)}
          className="flex items-center justify-between px-2 py-2 border border-border rounded-md flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <Image
              src={`data:image/png;base64,${selected.flag}`}
              alt={selected.name}
              width={6}
              height={6}
              className="w-6 h-6 object-cover rounded-full"
            />
            <span className="text-sm font-medium">{selected.dial_code}</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-t-custom-black ml-1" />
        </button>

        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setRegisterError(""); // clear error when user edits
          }}
          placeholder="9122566987"
          className="flex-grow px-1 py-2.5 border border-border rounded-md text-sm outline-none"
          autoComplete="off"
        />

        {expand && (
          <ul className="absolute z-10 mt-12 max-h-60 overflow-y-auto bg-white border rounded-md shadow-lg">
            {countries.map((c) => (
              <li
                key={c.code}
                onClick={() => {
                  setSelected(c);
                  setExpand(false);
                }}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Image
                    width={6}
                    height={6}
                    src={`data:image/png;base64,${c.flag}`}
                    alt={c.name}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                  <span className="text-sm">{c.name}</span>
                </div>
                {selected.code === c.code && (
                  <CheckIcon className="w-4 h-4 text-marker" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error display */}
      {phone.length > 10 && (
        <p className="text-sm text-red-500 mt-1">
          Phone number must be exactly 10 digits.
        </p>
      )}
      {registerError && (
        <p className="text-sm text-red-500 mt-1">{registerError}</p>
      )}
    </div>
  );
};
export default CountrySelector;

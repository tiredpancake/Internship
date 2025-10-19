import React from "react";

const PhoneField = () => {
  return (
    <div className="w-full  flex flex-col">
      <div className="flex flex-row mt-4 gap-3.5 w-full max-w-full  p-0.5 lg:gap-4 lg:px-10 lg:py-5">
        <button
          onClick={() => isExpanded(!expand)}
          className="flex  items-center justify-between px-2 py-2 border  border-border rounded-md   flex-shrink-0 min-w-1 g:px-6 lg:min-w-2 "
        >
          <div className="flex items-center gap-2">
            <Image
              src={`data:image/png;base64,${selected.flag}`}
              alt={selected.name}
              width={6}
              height={6}
              className="w-6 h-6 object-cover rounded-4xl"
            />
            <span className="text-sm font-medium">{selected.dial_code}</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-t-custom-black items-center ml-1" />
        </button>

        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setRegisterError("");
          }}
          placeholder="9122566987"
          className=" flex-grow min-w-0 px-2  py-2.5 outline-none text-sm border border-border rounded-md placeholder:text-sm placeholder:text-placeholder lg:min-w-30"
          autoComplete="off"
        />

        {expand && (
          <ul className="absolute z-10 mt-2 max-h-60 overflow-y-auto max-w-50  bg-white border rounded-md shadow-lg">
            {countries.map((c) => (
              <li
                key={c.code}
                onClick={() => {
                  setSelected(c);
                  isExpanded(false);
                }}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-1">
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
    </div>
  );
};

export default PhoneField;

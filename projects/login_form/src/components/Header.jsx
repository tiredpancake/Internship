import Image from "next/image";
import React from "react";

const Header = ({ title, subtitle }) => (
  <>
    <div className="flex items-center gap-2.5">
      <Image
        src="/Vector.svg"
        alt="logo"
        width={8}
        height={8}
        className="h-8 w-8"
      />
      <span className="font-bold text-3xl text-t-custom-black">ShiftWave</span>
    </div>
    <div className="flex flex-col items-center mt-10 lg:mt-7">
      <span className="text-t-gray text-2xl font-semibold">{title}</span>
      <span className="text-t-second-gray mt-2 text-base font-normal text-center">
        {subtitle}
      </span>
    </div>
  </>
);

export default Header;

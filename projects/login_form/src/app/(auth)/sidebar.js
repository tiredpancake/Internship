import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { it } from 'node:test';


const checkList=[
            "Gain access to powerful tools and resources designed to enhance your experience.",
            "Be the first to know about new features, updates, and special events.",
            "Connect with other users and share insights, tips, and experiences.",
            "We prioritize your security and privacy with industry-leading protections.Your information is safe with us!",
          ];

export const SideBar = () => {
  return (
    <div  className='items-center justify-center p-4 mt-2  flex-grow lg:p-20 lg:mt-10  lg:text-base '>
        <h1 className='text-t-purple   text-2xl font-bold  leading-7 mb-7 lg:text-5xl lg:leading-15 ' >
             Discover a world of <br/> possibilities{" "}
          <span className="text-black">  tailored just <br/>for you.</span>
        </h1>
        {
  checkList.map((item, index) => (
    <div
      key={index}
      className="flex items-start gap-1.5  mb-1.5  text-sm font-normal 
                  xl:gap-2.5 xl:mb-4 lg:text-base "
    >
      {/* <FaRegCheckCircle className="text-marker flex-shrink-0 relative w-4.5 h-4.5 mr-1 top-1" /> */}
      <img src='/Icon.svg' alt='checkmark' className=' flex-shrink-0 relative mr-1 top-1 h-4 w-4 lg:top-0.75 lg:h-5 lg:w-5 ' />
      <span className="leading-6 text-t-custom-black flex-1">{item}</span>
    </div>
  ))
}
        <span className=' relative text-t-gray space-x-1 text-sm top-2 lg:text-base'>Have questions? Visit our
            <a className='text-t-purple font-bold'> Help Center </a> or reach out to our 
            <a className='text-t-purple font-bold'> Support Team</a>
        </span>
    </div>
  )
}


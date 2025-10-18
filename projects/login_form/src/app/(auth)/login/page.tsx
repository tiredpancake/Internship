'use client';
import React, { useState } from 'react'
import countries from '../../../data/countries.json';
import { ChevronDownIcon, CheckIcon, EyeSlashIcon, EyeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import OTPPage from '../otp/page';
import Image from 'next/image';

const Page = () => {
  const [selected,setSelected]=useState(countries[98]);
  const[expand,isExpanded]=useState(false);
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showOtpPage, setShowOtpPage] = useState(false); 
  const [phoneError,setPhoneError]=useState('');
  const [passwordError,setPasswordError]=useState('');

  const passwordRules = [
  { id: 'length', label: 'Password must contain at least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: ' Password must contain one uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'Password must contain one number', test: (p: string) => /\d/.test(p) },
  { id: 'special', label: 'Password must contain one special character', test: (p: string) => /[!@#$%^&*]/.test(p) },
  ];

  const isPhoneValid = /^\d{10}$/.test(phone); 
  const isPasswordValid = passwordRules.every(rule => rule.test(password));
  const isFormValid = isPhoneValid && isPasswordValid;

  if (showOtpPage) {
    return <OTPPage phone={phone} mode='login'  onGoBack={() => setShowOtpPage(false)}/>;
  }

  const  handleLogIn=()=>{

    setPasswordError('');
    setPhoneError('');
    const saved=localStorage.getItem('users');
    if(!saved){
      setPhoneError('This account is not registered.')
      return;
    }
    const users=JSON.parse(saved);
    const isRegistered=users.find(u=>u.phone===phone && u.dialCode===selected.dial_code);
    if(!isRegistered){
      setPhoneError('This account is not registered.')
      return;
    }
    if(isRegistered.password!==password)
    {
      setPasswordError('password is incorrect.')
      return;
    }
    setShowOtpPage(true);

  }

  return (
    <div className=' flex justify-center items-center p-10 flex-col lg:p-24 ' >
      <div className='flex items-center gap-2.5'> 
        <Image src='/Vector.svg' alt='logo'  width={8} height={8} className='h-8 w-8'/>
        <span className='font-bold text-3xl text-t-custom-black'>ShiftWave</span>
      </div>

      <div className='flex flex-col items-center  mt-10 lg:mt-15'>
        <span className='text-t-gray text-2xl font-semibold whitespace-nowrap'>Login with mobile number</span>
        <span className=' text-center text-t-second-gray mt-2 text-base font-normal px-1 lg:px-0'>Please confirm your country code and enter your mobile number</span>
      </div>
      
      <div className='flex flex-row mt-5 gap-3.5 w-full max-w-full  p-0.5 lg:gap-4 lg:px-10 lg:py-5'>
        <button
        onClick={() => isExpanded(!expand)}
        className="flex  items-center justify-between px-2 py-2 border  border-border rounded-md   flex-shrink-0 min-w-1 g:px-6 lg:min-w-2 "
      >
        <div className="flex items-center gap-2">
          <Image
            src={`data:image/png;base64,${selected.flag}`}
            alt={selected.name}
            width={6} height={6}
            className="w-6 h-6 object-cover rounded-4xl"
          />
          <span className="text-sm font-medium">{selected.dial_code}</span>
        </div>
        <ChevronDownIcon className="w-4 h-4 text-t-custom-black items-center ml-1" />
      </button>

      <input
          type="tel"
          value={phone}
          onChange={(e) => {setPhone(e.target.value)
            setPhoneError('');
          }}
          placeholder="9122566987"
          className=" flex-grow min-w-0 px-2  py-2.5 outline-none text-sm border border-border rounded-md placeholder:text-sm placeholder:text-placeholder lg:min-w-30"
          autoComplete='off'
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
                  width={6} height={6}
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
      <div className='flex w-full max-w-full  -mt-1 lg:px-10 '>
          {phone.length > 10 && (
          <p className="text-sm text-red-500 mb-2 ">
              Phone number must be exactly 10 digits.
          </p>
          )}
          {phoneError && (
          <p className="text-sm text-red-500 mb-2 ">
              {phoneError}
          </p>
          )}
      </div>

      <div className="w-full max-w-full px-0 mt-1  relative lg:px-10">
        <label htmlFor="password" className="block text-sm font-medium text-t-gray mb-1 text-left">
          Password
        </label>
        <div className='relative'/>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {setPassword(e.target.value);
              setPasswordError('');}
            }
            placeholder="Enter your password"
            className="w-full px-4 py-2.5 pr-12 border border-border rounded-md text-sm outline-none placeholder:text-placeholder"
            autoComplete="off"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 text-t-gray top-8.5 lg:right-14"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>

          {passwordError && (
          <p className="text-sm text-red-500 mb-2 mt-2 ">
              {passwordError}
          </p>
          )}
        
        <button className={`relative w-full flex-grow bg-btn-bg text-white rounded-md py-3 mt-5 ${isFormValid ?'bg-btn-bg':'bg-btn-ds'}`}
                onClick={handleLogIn}
                disabled={!isFormValid}>Send OTP </button>
      </div>
      <div className='mt-5 text-t-gray font-normal text-md'>has not account? <Link href='/signup' className='text-t-purple font-semibold text-md'> Sing up</Link></div>  
    </div>
  );
};

export default Page;
'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import countries from '../../../data/countries.json';
import { CheckCircleIcon, CheckIcon, ChevronDownIcon, EyeIcon, EyeSlashIcon, XCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import OTPPage from '../otp/page';
import { json } from 'stream/consumers';



const page = () => {
  const [selected,setSelected]=useState(countries[98]);
  const[expand,isExpanded]=useState(false);
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setconfirmPassword]=useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [showOtpPage, setShowOtpPage] = useState(false); 
  const [agreed,setAgreed]=useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [registerError,setRegisterError]=useState('');

  const passwordRules = [
  { id: 'length', label: 'Password must contain at least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: ' Password must contain one uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'Password must contain one number', test: (p: string) => /\d/.test(p) },
  { id: 'special', label: 'Password must contain one special character', test: (p: string) => /[!@#$%^&*]/.test(p) },
  ];
  const isPhoneValid = /^\d{10}$/.test(phone);
  const isConfirmValid=confirmPassword===password; 
  const isPasswordValid = passwordRules.every(rule => rule.test(password));
  const isFormValid = isPhoneValid && isPasswordValid && agreed && isConfirmValid;

  const handleSignUp =()=>{
    setRegisterError('');
    if(!isFormValid) return;

    const newUSer={
        country:selected.name,
        dialCode :selected.dial_code,
        phone:phone,
        password:password,
    };
    const saved=localStorage.getItem('users');
    const users=saved? JSON.parse(saved):[];
    const isExisted=users.some(u=>u.phone===phone &&  u.dialCode===selected.dial_code)
    if(isExisted)
    {
        setRegisterError('User already registered.')
        return;
    }
    users.push(newUSer);
    localStorage.setItem('users',JSON.stringify(users));
    setShowOtpPage(true);
  }

  if (showOtpPage) {
    return <OTPPage phone={phone} mode='signup' onGoBack={() => setShowOtpPage(false)}  />;
  }


  return (
      <div className=' flex justify-center items-center p-10 flex-col lg:p-24 ' >
            <div className='flex items-center gap-2.5'> 
              <Image src='/Vector.svg' alt='logo'  width={8} height={8} className='h-8 w-8'/>
              <span className='font-bold text-3xl text-t-custom-black'>ShiftWave</span>
            </div>
      
            <div className='flex flex-col items-center  mt-10 lg:mt-7'>
              <span className='text-t-gray text-2xl font-semibold whitespace-nowrap'>Sign up</span>
              <span className=' text-center text-t-second-gray mt-2 text-base font-normal px-1 lg:px-0'>Enter your details to sign up</span>
            </div>
            <div className='flex flex-row mt-4 gap-3.5 w-full max-w-full  p-0.5 lg:gap-4 lg:px-10 lg:py-5'>
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
                onChange={(e) =>{ setPhone(e.target.value)
                    setRegisterError('');
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
            <div className='flex w-full max-w-full   lg:px-10 '>
                {phone.length > 10 && (
                <p className="text-sm text-red-500 mb-2 ">
                    Phone number must be exactly 10 digits.
                </p>
                )}
                {registerError && (
                <p className="text-sm text-red-500 mb-2 -mt-1 ">
                    {registerError}
                </p>
                )}
            </div>
            <div className="w-full max-w-full px-0 mt-0  relative lg:px-10">
                <label htmlFor="password" className="block text-sm font-medium text-t-gray mb-1 text-left">
                Password
                </label>
                <div className='relative'/>
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <ul className="mt-2 space-y-1">
                {passwordRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                    <li key={rule.id} className="flex items-start gap-2">
                        {passed ? (
                        <CheckCircleIcon className="w-5 h-5 text-marker" />
                        ) : (
                        <XCircleIcon className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-sm ${passed ? 'font-semibold text-marker' : 'text-gray-500'}`}>
                        {rule.label}
                        </span>
                    </li>
                    );
                })}
                </ul>
                <div className='w-full max-w-full px-0 mt-0  relative '>
                <label htmlFor="password" className="block text-sm font-medium text-t-gray mb-1 text-left mt-5 ml-0.5">
                Confirm Password
                </label>
                <div className='relative'/>
                <input
                    id="confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    onBlur={() => setConfirmTouched(true)} 
                    placeholder="Type your password again"
                    className=" no-browser-eye w-full px-4 py-2.5 pr-12 border border-border rounded-md text-sm outline-none placeholder:text-placeholder"
                    autoComplete="new-password"
                     
                />   

                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5  text-t-gray top-8.5 lg:right-4 z-10"
                >
                    {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                    <EyeIcon className="w-5 h-5" />
                    )}
                </button>
                {confirmTouched && !isConfirmValid&&  (
                <p className="text-sm text-red-500  mt-3 ">
                    Should match the password.
                </p>
                )}
                <div className="flex items-start gap-2 mt-4">
                    <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 accent-marker p-10"
                    />
                    <label htmlFor="agree" className="text-sm text-t-gray font-medium text-base">
                    I agree with <span className='text-t-purple font-semibold'>Terms</span> and <span className='text-t-purple font-semibold'>Privacy policy</span>.
                    </label>
                </div>

                </div>
                <button className={`relative w-full flex-grow bg-btn-bg text-white rounded-md py-3 mt-5 ${isFormValid ?'bg-btn-bg':'bg-btn-ds'}`}
                onClick={handleSignUp}
                disabled={!isFormValid}>Sign up </button>
            </div>
                  <div className='mt-5 text-t-gray font-normal text-md'>Already have an account yet? <Link href='/login' className='text-t-purple font-semibold text-md'> Sing In</Link></div>  

    </div>
  )
}

export default page

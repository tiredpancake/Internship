'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button className="bg-marker px-5 py-5 text-white rounded-2xl "
      onClick={()=>router.push('/login')}>Sign in</button>
    </div>
  );
}

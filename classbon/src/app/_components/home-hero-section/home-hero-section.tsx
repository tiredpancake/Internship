import { Button } from "../button"
import Image from 'next/image'
import { IconArrowLeftFill } from "../icons/icons"
export const HomeHeroSection:React.FC =()=>{
    return(<>
        <section className="bg-hero-pattern mt-5 xl:mt-20 xl:bg-left">
        <div className="container flex flex-col-reverse items-center xl:flex-row">
        <div className="flex flex-col gap-5 mt-12 pb-5 text-center xl:text-right ">
            <h3 className="text-xl dark:text-info xl:text-2xl">خوش اومدی به ...</h3>
            <h1 className="text-3xl  font-black gradient lg:text-5xl xl:text-5xl">مسیر صعود به قله های برنامه نویسی</h1>
            <p className="max-w-2xl  text-lg md:text-xl font-bold leading-8">
            هر جای مسیرِ برنامه‌نویسی که باشی، با هم‌راهی استادهای باتجربهٔ
            کلاسبن می‌تونی بدون محدودیت به قله‌های بالاتر صعود کنی. ما همیشه
            هواتو داریم.
            </p>
            <div className="mt-5 flex gap-4 justify-center xl:justify-start">
            <Button variant="primary" size="large">دوره های ری اکت و نکست 
                <IconArrowLeftFill fill='currentColor'/>
            </Button>
            <Button variant="neutral" size="large">مشاوره برنامه نویسی</Button>
            </div>
            <Image src="/images/frameworks.png" 
            className="grayscale mt-4 opacity-70 m-auto xl:m-0"
            width={412}
            height={39 }
            alt="" ></Image>
            </div>
            <Image src="/images/programmer-landing.svg"
                width={702}
                height={521}
                alt="کلاسبن"
            />
            </div>
    </section>
       <section className="px-2 my-40">
                {/* <div className="sticky top-0 pt-0 text-center"> */}
                <div className="relative pt-0 text-center">
                    <div className="bg-primary pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2 -top-96 rounded-full opacity-10 blur-3xl"></div>

                    <h2
                        lang="en"
                        className="gradient leading-[1.3] relative z-10 mx-auto inline-block text-[clamp(2rem,6vw,5.5rem)] font-black"
                    >
                        ReactJs & Next.js
                    </h2>
                    <p className="text-base-content/70  relative z-[2] py-4 m-auto md:text-3xl max-w-5xl font-light !leading-[1.7]">
                        ری‌اکت و نکست‌جی‌اس برترین کتابخونه‌های فرانت‌اند و
                        یکه‌تاز دنیای وب! پیشرفته‌ترین مباحث رو اینجا می تونی
                        پیدا کنی. پس همین الان یادگیری رو شروع کن ما هم از
                        ابتدای مسیر با آموزش‌های تخصصی و کاملاً کاربردی کنارت
                        هستیم.
                    </p>
                    <div className="flex flex-col lg:flex-row items-center gap-3 justify-center">
                        <Button
                            variant="primary"
                            size="large"
                            className="mt-7"
                            animatedIcon={true}
                        >
                            دوره‌های ری اکت و نکست‌ جی‌اس
                            <IconArrowLeftFill fill="currentColor" />
                        </Button>
                        <Button
                            variant="neutral"
                            size="large"
                            className="mt-7"
                            animatedIcon={true}
                        >
                            مقالات ری اکت و نکست‌ جی‌اس
                        </Button>
                    </div>
                </div>
            </section>


            
        </>
    );
}
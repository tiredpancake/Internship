import {FC} from 'react'

export const Colors:FC=()=>
{
    const colors: Record<string, string> = {
    primary: "bg-primary",
    "primary-content": "bg-primary-content",
    "primary-focus": "bg-primary-focus",
    secondary: "bg-secondary",
    "secondary-content": "bg-secondary-content",
    "secondary-focus": "bg-secondary-focus",
    accent: "bg-accent",
    "accent-content": "bg-accent-content",
    "accent-focus": "bg-accent-focus",
    neutral: "bg-neutral",
    "neutral-content": "bg-neutral-content",
    "neutral-focus": "bg-neutral-focus",
    info: "bg-info",
    "info-content": "bg-info-content",
    success: "bg-success",
    "success-content": "bg-success-content",
    warning: "bg-warning",
    "warning-content": "bg-warning-content",
    error: "bg-error",
    "error-content": "bg-error-content",
    "gradient-first": "bg-gradient-first",
    "gradient-second": "bg-gradient-second",
  };


 return <div className='flex flex-wrap justify-center p-4 gap-4' dir='ltr' lang='en'>

    {
        
        Object.entries(colors).map(([name,color])=>
         <div key={name}
        className={`${color} w-96 h-96 flex items-center justify-center uppercase  rounded-xl shadow`}
        >
            <span className=' font-semibold text-lg bg-white p-2 rounded-lg  '>
                {name}
            </span>
        </div>
        )
    }
  </div>


}
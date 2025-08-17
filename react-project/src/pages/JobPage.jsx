import React from 'react'
import { useParams,useLoaderData} from 'react-router-dom';
import Spinner from '../Components/Spinner';


const JobPage = () => {
    const {id}=useParams();
    const job=useLoaderData();
    console.log(job);
    // const [job,setJob]=useState(null);
    // const [loading,setLoading]= useState(true);

    // useEffect(()=>{

    //     const fetchJobs=async  ()=>
    //     {
    //         try{
    //             const res = await fetch (`/api/jobs/${id}`);
    //             const data = await res.json();
    //             setJob(data);
    //         }
    //         catch{
    //             console.log('Error fetching data',error);
    //         }finally{
    //         setLoading(false);
    //         }
    //     }
    //     fetchJobs();

    // },[])
    return (
        <h1>{job.title}</h1>
    );
}

const jobLoader =async({params})=>{
    const res=await fetch (`/api/jobs/${params.id}`)
    const data =await res.json;
    return data;
}

export  { JobPage as default, jobLoader } ;

import axios from "axios";

const url="https://mocki.io/v1/8ebcb9ff-6000-4d9c-83aa-98e16e99aa00";

export const  getMonths =async ()=>{
  try {
    const response =await axios.get(url);
    return response.data.columns;
  } 
  catch(error){
    console.error("Error Fetching months:",error);
    return [];
  }
}
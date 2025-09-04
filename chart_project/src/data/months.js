import axios from "axios";

const url="https://mocki.io/v1/91448c9c-9928-41ce-a936-54d2832ff012";

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
import axios from "axios";
const url="https://mocki.io/v1/8ebcb9ff-6000-4d9c-83aa-98e16e99aa00";

export const getData=async()=>{
  try{
    const response=await axios.get(url);
    const rows=response.data.rows;
    const data=response.data.data;
    return rows.map((year,index)=>({
      year,
      nums:data[index].map(num=>num??0)
    }));

  }
  catch(error){
    console.error("Error fetching data:",error)
  }

}


export const summaryRows=async()=>{


try{
    const response=await axios.get(url);
    const data=response.data.data;
    const column=getColumn(data);
    const averages=calculateAVG(column);
    const stdDevs=calculateStdDev(column);

    console.log("average",averages);
    const summaryRows = [
      { year: 'میانگین', nums: averages },
      { year: 'انحراف معیار', nums: stdDevs }
    ];
      return summaryRows;

  }
  catch(error){
    console.error("Error fetching data:",error)
  }


}


const getColumn = (data) => {
  const columns = [];

  for (let i = 0; i < 12; i++) {
    const temp = [];
    for (let j = 0; j < data.length; j++) {
      temp.push(data[j][i]); 
    }
    columns.push(temp);
  }

  return columns; 
};

const calculateAVG = (columns) => {
  const res = [];

  for (let i = 0; i < columns.length; i++) {
    let count = 0;
    let temp = 0;

    for (let j = 0; j < columns[i].length; j++) {
      if (columns[i][j] != null) {
        count++;
        temp += columns[i][j];
      }
    }

    res.push(count > 0 ? +(temp / count).toFixed(1) : 0); 
  }

  return res;
};

const calculateStdDev = (columns) => {
  const result = [];

  for (let i = 0; i < columns.length; i++) {
    const values = columns[i].filter(val => val !== null); // ignore nulls
    const count = values.length;

    if (count === 0) {
      result.push(0); 
      continue;
    }

    const mean = values.reduce((sum, val) => sum + val, 0) / count;

    const variance = values.reduce((sum, val) => {
      return sum + Math.pow(val - mean, 2);
    }, 0) / count;

    const stdDev = Math.sqrt(variance);
    result.push(+stdDev.toFixed(1)); 
  }

  return result;
};

const statsData = [
  { year: 1403, nums: [4, 11, 7, 6, 0, 0, 0, 0, 0, 0, 0, 0] },
  { year: 1402, nums: [11, 6, -3, 8, 5, -3, -2, 8, 6, 3, -2, 2] },
  { year: 1401, nums: [12, 8, -3, -3, -2, 5, 6, 12, -3, 4, -3, 6] },
  { year: 1400, nums: [5, 2, -8, 5, 6, 6, -2, 12, -3, -5, 6, 6] },
  { year: 1399, nums: [9, 6, -1, -2, 6, -2, 8, -6, 9, 5, -8, 6] },
  { year: 1398, nums: [8, 2, -3, 6, -3, 6, 5, 8, 9, 3, 5, -1] },
  { year: 1397, nums: [6, 5, 6, 6, 9, 8, 7, -9, -2, 8, -3, 8] },
  { year: 1396, nums: [9, 8, -6, -3, -9, -8, -1, -2, -8, -9, -7, 1] },
  { year: 'میانگین', nums: [8, 6, -1, 2, 2, 2, 3, 3, 1, 1, -2, 4] },
  { year: 'انحراف معیار', nums: [2.7, 2.9, 5, 4.5, 6, 5.6, 4.1, 8.1, 6.3, 5.6, 5, 3.1] },
];

export default statsData;

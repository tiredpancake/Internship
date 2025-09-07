import axios from "axios";
const url = "https://mocki.io/v1/91448c9c-9928-41ce-a936-54d2832ff012";

// Single function to fetch all data
export const fetchAllData = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Modify existing functions to use the cached data
export const getData = async (cachedData = null) => {
  try {
    const data = cachedData || await fetchAllData();
    if (!data) return [];
    
    const { rows, data: values } = data;
    return rows.map((year, index) => ({
      year,
      nums: values[index]
    }));
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
};

export const summaryRows = async (cachedData = null) => {
  try {
    const data = cachedData || await fetchAllData();
    if (!data) return [];
    
    const columns = transposeToColumns(data.data);
    const { averages, stdDevs } = calculateSummaryStats(columns);

    return [
      { year: 'میانگین', nums: averages },
      { year: 'انحراف معیار', nums: stdDevs }
    ];
  } catch (error) {
    console.error("Error processing summary rows:", error);
    return [];
  }
};

export const getMonths = async (cachedData = null) => {
  try {
    const data = cachedData || await fetchAllData();
    if (!data) return [];
    
    return data.columns;
  } catch (error) {
    console.error("Error Fetching months:", error);
    return [];
  }
};

const transposeToColumns = (rows) => {
  const columnCount = 12;
  return Array.from({ length: columnCount }, (_, colIndex) => 
    rows.map(row => row[colIndex])
  );
};

const calculateSummaryStats = (columns) => {
  const averages = [];
  const stdDevs = [];

  columns.forEach(col => {
    const values = col.filter(val => val != null);
    const count = values.length;

    if (count === 0) {
      averages.push(0);
      stdDevs.push(0);
      return;
    }

    const mean = values.reduce((sum, val) => sum + val, 0) / count;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    averages.push(+mean.toFixed(1));
    stdDevs.push(+stdDev.toFixed(1));
  });

  return { averages, stdDevs };
};
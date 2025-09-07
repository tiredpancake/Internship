import { useData } from "./datacontext";

export const getData = (responseData) => {
  try {
    console.log(responseData)
    const { rows, data: values } = responseData;
    return rows.map((year, index) => ({
      year,
      nums: values[index]
    }));
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
};

export const summaryRows =(data ) => {
  try {
    
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

export const getMonths =  (data) => {
  try {
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
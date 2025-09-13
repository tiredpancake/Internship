import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { faker } from "@faker-js/faker";
import svgImg from "../../assets/git-compare.png";
import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(jalali);
dayjs.extend(utc);
dayjs.locale("fa");

 const generateSeries = (
  label: string,
  color: string,
  symbol: Highcharts.SymbolKeyValue
) => {
  const startDate = dayjs("1404-01-01", { jalali: true }); 
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = startDate.add(i * 1, "day");

    const gregorianDate = dayjs(date.format("YYYY-MM-DD"), "YYYY-MM-DD");
    const utcTimestamp = Date.UTC(
      gregorianDate.year(),
      gregorianDate.month(),
      gregorianDate.date()
    );

    return [
      utcTimestamp,
      faker.number.float({ min: 5, max: 55, fractionDigits: 0 }),
    ];
  });

  return {
    type: "line",
    name: label,
    color,
    marker: { enabled: false, symbol },
    showInLegend:true,
    legendIndex:0,
    data: data.map((point, index) => ({
      x: point[0],
      y: point[1],
      marker: { enabled: index === data.length - 1 },
    })),
    
  } as Highcharts.SeriesLineOptions;
};


export const ChartPage: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: { text: "" },
    xAxis: {
  type: "datetime",
  // Show only some labels on x-axis
  labels: {
    formatter: function () {
      const date = dayjs(this.value as number).calendar("jalali").locale("fa");
      const day = date.date(); // day number
      const month = date.format("MMM");

      // Show labels only for 1st, 10th, 20th of the month
      if (day === 1 || day === 10 || day === 20) {
        return `${day} ${month}`;
      }
      return ""; // hide other labels
    },
    style: { fontFamily: "vazirmatn" },
  },
  crosshair: {
    color: "#8C9096",
    dashStyle: "Dash",
    width: 1,
    zIndex: 5,
  },
},

    yAxis: {
      min: 0,
      max: 60,
      tickInterval: 10,
      title: { text: "بازده" },
      labels: { format: "{value}%" },
    },
  tooltip: {
  shared: true,
  useHTML: true,
  backgroundColor: "#05070CD9",
  borderColor: "#05070CD9",
  borderRadius: 10,
  borderWidth: 2,
  style: {
    color: "#FAFBFC",
    fontSize: "14px",
    fontFamily: "vazirmatn",
    padding: "8px",
  },
  formatter: function () {
  const date = dayjs(this.x as number)
    .calendar("jalali")
    .locale("fa");
  const day = date.format("D");
  const month = date.format("MMMM");

  // Tooltip header (date) aligned to right
  let content = `<div style="text-align:right; font-weight:bold; margin-bottom:4px;"> ${day} ${month} </div>`;

  this.points?.forEach((point) => {
    content += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-top:2px;">
        <!-- Percentage on left -->
        <span style="text-align:left; flex:0; margin-right:10px">${point.y?.toFixed(2)}%</span>

        <!-- Series name with marker on right -->
        <span style="text-align:right; flex:1; display:flex; align-items:center; justify-content:flex-end; gap:4px;">
          ${point.series.name}
          <span style="display:inline-block; width:10px; height:10px; background-color:${point.color}; border-radius:50%;"></span>
        </span>
      </div>
    `;
  });

  return content;
},

},


   legend: {
  align: "center",
  verticalAlign: "bottom",
  layout: "horizontal",
  symbolHeight: 12,   // height of marker in legend
  symbolWidth: 12,    // width of marker in legend
  symbolRadius: 6,    // 0 = square, >0 = circle, triangles keep default shape
},
    series: [
      generateSeries("شاخص کل", "#c0392b", "square"),
      generateSeries("صندوق های سهامی", "#f39c12", "triangle"),
      generateSeries("صندوق سهم آشنا", "#2980b9", "circle"),
    ],
    credits: { enabled: false },
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md w-full max-w-4xl mx-auto">
      <button className="self-end flex items-center gap-2 px-2 py-1 mb-4 text-sm rounded-xl text-[#009695] hover:bg-green-200 border-2 border-[#009695]">
        مقایسه
        <img src={svgImg} alt="compare" className="w-4 h-4" />
      </button>
      <HighchartsReact highcharts={Highcharts} options={options}  />
    </div>
  );
};

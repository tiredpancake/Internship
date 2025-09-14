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
  const data = Array.from({ length: 12 }, (_, i) => {
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
    marker: { enabled: false },
    showInLegend: true,
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
        marginTop: 50, // Add some top margin if needed

    },
    title: { text: "" },
   xAxis: {
  type: "datetime",
  lineWidth: 0,      // remove axis line
  tickLength: 0,     // remove tick marks
  labels: {
    formatter: function () {
      // Convert value into Jalali dayjs
      const date = dayjs(this.value as number).calendar("jalali").locale("fa");
      const day = date.date();
      const month = date.format("MMM"); // e.g. فرو, ارد

      if (day === 1 || day === 10 || day === 20) {
        return `${day} ${month}`;
      }
      return "";
    },
    style: { fontFamily: "vazirmatn" },
  },
  tickInterval: 24 * 3600 * 1000, // force daily ticks
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
      title: { 
    text: "بازده",
    align: "high", 
    rotation: 0,   
    offset: 0,     
    y: -40,       
    x: -10  ,      
     style: {
      fontWeight: "bold",
      fontFamily: "vazirmatn"
    }
  },
      labels: { 
        formatter:function(){
      return this.value === 0 ? "0" : this.value + "%";
        }
       },
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
      const date = dayjs(this.x as number).calendar("jalali").locale("fa");
      const day = date.format("D");
      const month = date.format("MMMM");

      let content = `<div style="text-align:right; font-weight:bold; margin-bottom:4px;"> ${day} ${month} </div>`;

      const sortedPoints = [...(this.points || [])].sort((a, b) => {
        if (a.series.name === "شاخص کل") return 1;
        if (b.series.name === "شاخص کل") return -1;
        return 0;
      });

  sortedPoints.forEach((point) => {
    const seriesOptions = point.series.options as Highcharts.SeriesLineOptions;
    const symbol = seriesOptions.marker?.symbol || "circle";

    let shapeStyle = `
      width: 10px; 
      height: 10px; 
      background-color:${point.color};
      border-radius:50%;
    `;

    if (symbol === "square") {
      shapeStyle = `
        width: 10px; 
        height: 10px; 
        background-color:${point.color};
        border-radius:2px;
      `;
    } else if (symbol === "triangle") {
      shapeStyle = `
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 10px solid ${point.color};
      `;
    }

    content += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-top:2px;">
        
        <!-- percentage on left -->
        <span style="flex:0; text-align:left; margin-right:10px;">
          ${point.y}%
        </span>

        <!-- name + marker on right -->
        <span style="flex:1; display:flex; align-items:center; gap:4px; justify-content:flex-end;">
          :بازده ${point.series.name}
          <span style="${shapeStyle}"></span>
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
      symbolHeight: 12,
      symbolWidth: 12,
      symbolRadius: 6, 
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

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
    marker: { enabled: false, symbol },
    showInLegend: true,
    legendSymbol: "lineMarker", 
    data: data.map((point, index) => ({
      x: point[0],
      y: point[1],
      marker: { enabled: index === data.length - 1 }, 
    })),
  } as Highcharts.SeriesLineOptions;
};

export const ChartPage: React.FC = () => {
  const toPersianNumbers = (input :string|number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/\d/g, (digit) => {
      return persianDigits[parseInt(digit)];
    });
  };

  // Generate series data first
  const seriesData = [
    generateSeries("شاخص کل", "#DD1919", "square"),
    generateSeries("صندوق های سهامی", "#FFB300", "triangle"),
    generateSeries("صندوق سهم آشنا", "#0072F0", "circle"),
  ];

  // Calculate averages from the generated data
  const calculateAverage = (data: any[]) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((total, point) => total + (point.y || 0), 0);
    return sum / data.length;
  };

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      marginTop:50,
    },
    title: { text: "" },
    xAxis: {
  type: "datetime",
  lineWidth: 0,      
  tickLength: 0,    
  labels: {
    useHTML: true,
    formatter: function () {
      const date = dayjs(this.value as number).calendar("jalali").locale("fa");
      const day = date.date();
      const month = date.format("MMM"); 

      if (day === 1 || day === 10 || day === 20) {
        // Month on left, day on right
        return `
          <div style="display: flex; direction: ltr;">
            <span style="order: 2;">${toPersianNumbers(day)} </span>
            <span style="order: 1; margin-left: 4px; margin-right:2px;">${month}</span>
          </div>
        `;
      }
      return "";
    },
    style: { fontFamily: "vazirmatn" },
  },
  tickInterval: 24 * 3600 * 1000,
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
        x: -12,      
        style: {
          color:'#05070C',
          fontWeight: "bold",
          fontFamily: "vazirmatn"
        }
      },
      labels: {
        style: {
          fontFamily: "vazirmatn"
        }, 
        formatter:function(){
          return this.value === 0 ? toPersianNumbers(0) : toPersianNumbers(this.value) + "%";
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

        let content = `<div style="display:flex; justify-content:flex-start; margin-bottom:4px; direction:rtl;">
          <span style="margin-left:4px;">${toPersianNumbers(day)}</span>
          <span>${month}</span>
        </div>`; 
        
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
            border: 1px solid white;
          `;

          if (symbol === "square") {
            shapeStyle = `
              width: 10px; 
              height: 10px; 
              background-color:${point.color};
              border-radius:2px;
              border: 1px solid white;
            `;
          } 
          if (symbol === "triangle") {
            shapeStyle = `
              width: 12px;
              height: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              border: 1.5px solid white;
              clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
              background-color: ${point.color};
            `;
          }

          content += `
            <div style="display:flex; justify-content: space-between; align-items:center; margin-top:10px; margin-left:5px">
              <!-- percentage on left -->
              <span style="flex:0; text-align:left; margin-right:10px;">
                ${toPersianNumbers(point.y || 0)}%
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
      enabled: false, // Disable default Highcharts legend
    },
    series: seriesData,
    credits: { enabled: false },
  };

  return (
    <div className="font-vazirmatn flex flex-col items-center p-6 bg-white rounded-2xl shadow-md w-full max-w-3xl mx-auto">
      <button className=" place-self-end flex items-center  -mb-6 gap-2 px-2 py-1  mr-20 text-base rounded-md  text-[#009695] hover:bg-green-200 border-2 border-[#009695]">
        مقایسه
        <img src={svgImg} alt="compare" className="w-4 h-4" />
      </button>
      <HighchartsReact 
        highcharts={Highcharts} 
        options={options} 
      />
      
      {/* Custom Legend */}
      <div className="custom-legend flex justify-center gap-8 mt-4">
        {seriesData.map((series: any, index: number) => {
          const average = calculateAverage(series.data);
          
          return (
            <div key={index} className="legend-item flex items-center gap-2" style={{ direction: 'rtl' }}>
              <div className="flex items-center gap-1">
                <div 
                  className="w-3 h-3"
                  style={{
                    backgroundColor: series.color,
                    border: '1.5px solid white',
                    borderRadius: series.marker?.symbol === 'circle' ? '50%' : 
                                series.marker?.symbol === 'square' ? '2px' : '0',
                    clipPath: series.marker?.symbol === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                  }}
                ></div>

              </div>
                                              <span className="text-sm">{series.name}:</span>
              <span className="text-sm text-green-700">{toPersianNumbers(average.toFixed(0))}%</span>

            </div>
          );
        })}
      </div>
    </div>
  );
};
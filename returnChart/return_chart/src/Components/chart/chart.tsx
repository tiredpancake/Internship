import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { faker } from "@faker-js/faker";
import svgImg from "../../assets/git-compare.png";
import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";
import utc from "dayjs/plugin/utc";
import { cn } from "../../utils/cn"; 
import { toPersianNumbers } from "../../utils/conversion";


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
    const date = startDate.add(i, "day");
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
      marginTop: 50,
    },
    title: { text: "" },
   xAxis: {
      type: "datetime",
      lineWidth: 1,
      tickLength: 0,
      labels: {
        useHTML: true, 
        formatter: function () {
          const date = dayjs(this.value as number)
            .calendar("jalali")
            .locale("fa");
          const day = date.date();
          const month = date.format("MMM");

          if (day === 1 || day === 10 || day === 20) {
            return `<div style="display:flex; flex-direction:row-reverse; gap:2px; font-family:vazirmatn;">
                      <span>${toPersianNumbers(day)}</span>
                      <span>${month}</span>
                    </div>`;
          }
          return "";
        },
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
          color: "#05070C",
          fontWeight: "bold",
          fontFamily: "vazirmatn",
        },
      },
      labels: {
        style: { fontFamily: "vazirmatn,senserif" },
        formatter: function () {
          return  cn( this.value!==0 && toPersianNumbers(this.value) + "%",
            this.value === 0 && toPersianNumbers(0),
            )
        },
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
        const date = dayjs(this.x as number)
          .calendar("jalali")
          .locale("fa");
        const day = date.format("D");
        const month = date.format("MMMM");

        let content = `<div style="display:flex; justify-content:flex-start; margin-bottom:4px; direction:rtl;">
                          <span style="margin-left:4px;">${toPersianNumbers(day)}</span>
                          <span>${month}</span>
                         </div>`;
                         
        this.points?.forEach((point) => {
          const seriesOptions = point.series
            .options as Highcharts.SeriesLineOptions;
          const symbol = seriesOptions.marker?.symbol || "circle";
            let shapeStyle =cn( `width:10px;height:10px;background-color:${point.color};border-radius:50%;border:1px solid white;`,
          symbol === "square"&&`width:10px;height:10px;background-color:${point.color};border-radius:2px;border:1px solid white;`,
          symbol === "triangle"&& `width:12px;height:12px;display:flex;align-items:center;justify-content:center;position:relative;border:1.5px solid white;clip-path:polygon(50% 0%,0% 100%,100% 100%);background-color:${point.color};`)


          content += `
            <div style="display:flex; justify-content: space-between; align-items:center; margin-top:10px; margin-left:5px">
              <span style="flex:0; text-align:left; margin-right:10px;">
                ${toPersianNumbers(point.y || 0)}%
              </span>
              <span style="flex:1; display:flex; align-items:center; gap:4px; justify-content:flex-end;">
                :بازده ${point.series.name}
                <span style="${shapeStyle}"></span>
              </span>
            </div>`;
        });
        return content;
      },
    },

   legend: {
    useHTML: true,
    rtl: true,
    align: "left",         
    layout: "horizontal",   
    symbolPadding: -15,               
    symbolWidth: 20,                 
    labelFormatter: function () {
      const s = this as Highcharts.Series;
      const lastPoint = s.data[s.data.length - 1];
      const lastY = lastPoint ? (lastPoint.y as number) : 0;
      const num = toPersianNumbers(Math.round(lastY));

      const markerShape =
        (s.options as Highcharts.SeriesLineOptions).marker?.symbol || "circle";
      const color = s.color;

      const marker = `<span style="
       width:10px;height:10px;margin-top:1px;margin-left:10px;

        background:${color};
        ${cn(
          markerShape === "square"&&"border-radius:2px;",
          markerShape === "triangle" &&"clip-path:polygon(50% 0%,0% 100%,100% 100%);",
          markerShape === "circle" &&"border-radius:50%;",)
        }
      "></span>`;

    return `<span style="display:flex; align-items:center;justify-content:flex-end;direction:rtl;gap:8px;line-height:14px;"> ${marker}
        <span style="margin-top:1px" >${s.name}: </span>
        <span style="font-weight:bold;color:#00822D ;margin-top:5px;">${num}%</span>
      </span>`;
  },
  
  itemStyle: {
    fontFamily: "vazirmatn",
    fontSize: "14px",
    color: "#05070C",
    textAlign:'center',
  },
  
    },
    series: [
      
      generateSeries("صندوق سهم آشنا", "#0072F0", "circle"),
      generateSeries("صندوق های سهامی", "#FFB300", "triangle"),
      generateSeries("شاخص کل", "#DD1919", "square"),

    ],
    credits: { enabled: false },
  };

  return (
    <div className="font-vazirmatn flex flex-col items-center p-6 bg-white rounded-2xl shadow-md w-full max-w-3xl mx-auto">
      <button className="place-self-end flex items-center -mb-6 gap-2 px-2 py-1 mr-20 text-base rounded-md text-customGreen  border-2 border-customGreen">
        مقایسه
        <img src={svgImg} alt="compare" className="w-4 h-4" />
      </button>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

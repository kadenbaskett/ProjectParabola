"use client";

import {
  createChart,
  ColorType,
  LineData,
  BarData,
  CandlestickData,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  priceData: CandlestickData[];
}

const colors = {
  backgroundColor: "black",
  lineColor: "#2962FF",
  textColor: "black",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

export const Chart: React.FC<ChartProps> = ({ priceData: priceData }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef?.current as HTMLDivElement, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      width: chartContainerRef?.current?.clientWidth,
      height: chartContainerRef?.current?.clientHeight,
      timeScale: {
        barSpacing: 6,
        rightOffset: 20,
        // timeVisible: true,
        borderVisible: false,
        // tickMarkFormatter: (time, tickMarkType, locale) => {
        //   const date = new Date(time * 1000);
        //   const dayOfMonth = date.getDate();
        //   const month = date.toLocaleString(locale, { month: 'short' });

        //   if (chart. !== dayOfMonth) {
        //     chart.lastPrintedDay = dayOfMonth;
        //     return `${dayOfMonth} ${month}`;
        //   }

        //   return '';
        // },
      },
    });

    // const newSeries = chart.addLineSeries();
    const barSeries = chart.addCandlestickSeries();
    barSeries.applyOptions({
      lastValueVisible: false,
      priceLineVisible: false,
    });
    barSeries.setData(priceData);
    // newSeries.setData(priceData);
    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [priceData]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
};

export default Chart;

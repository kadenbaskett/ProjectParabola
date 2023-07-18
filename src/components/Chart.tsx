"use client";

import {
  createChart,
  ColorType,
  LineData,
  BarData,
  CandlestickData,
  HistogramData,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  priceData: CandlestickData[];
  volumeData: HistogramData[];
  indicatorData: LineData[][];
  backgroundColor: string;
}

let lastProcessedDay = -1; // Initialize the last processed day with an invalid value
let lastProcessedMonth = -1;

export const Chart: React.FC<ChartProps> = ({
  priceData,
  volumeData,
  indicatorData,
  backgroundColor,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef?.current as HTMLDivElement, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
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
        tickMarkFormatter: (
          time: number,
          tickMarkType: any,
          locale: Intl.LocalesArgument
        ) => {
          const date = new Date(time * 1000);
          const dayOfMonth = date.getDate();
          const month = date.toLocaleString(locale, { month: "short" });
          //TODO fix this to only show beginning of days and months labeled
          if (
            dayOfMonth !== lastProcessedDay ||
            date.getMonth() !== lastProcessedMonth
          ) {
            lastProcessedDay = dayOfMonth;
            lastProcessedMonth = date.getMonth();
            return `${dayOfMonth}`;
          }

          return ``;
        },
      },
    });

    // add candlesticks
    const barSeries = chart.addCandlestickSeries();
    barSeries.applyOptions({
      lastValueVisible: true,
      priceLineVisible: false,
      wickUpColor: "rgb(82, 237, 58)",
      upColor: "rgb(82, 237, 58)",
      wickDownColor: "rgb(237, 58, 82)",
      downColor: "rgb(237, 58, 82)",
      borderVisible: false,
    });
    barSeries.setData(priceData);
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    });

    // add volume bars
    volumeSeries.applyOptions({
      lastValueVisible: true,
      priceLineVisible: false,
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0, // lowest point will be at the very bottom.
      },
    });
    volumeSeries.setData(volumeData);

    // add indicator curvers
    const lineSeries = chart.addLineSeries();
    lineSeries.applyOptions({
      lastValueVisible: true,
      priceLineVisible: false,
      lineWidth: 1,
    });
    lineSeries.setData(indicatorData[0]);

    chart.timeScale().setVisibleLogicalRange({
      from: Math.floor(priceData.length / 2),
      to: priceData.length,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [priceData]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
};

export default Chart;

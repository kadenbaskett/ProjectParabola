"use client";

import { createChart, ColorType, LineData } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  priceData: LineData[];
}

const colors = {
  backgroundColor: "white",
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
      },
      width: chartContainerRef?.current?.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addLineSeries();
    newSeries.setData(priceData);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [priceData]);

  return <div ref={chartContainerRef} />;
};

export default Chart;

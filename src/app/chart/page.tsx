"use client";

import Chart from "@/components/Chart";
import { BarData, LineData } from "lightweight-charts";
import { SetStateAction, useEffect, useState } from "react";
import { getIntradayCandles } from "../api/simmispotter-api/GetIntradayCandles";
import { InfinitySpin } from "react-loader-spinner";
import TickerSearch from "@/components/SearchBars/TickerSearch";
import IntervalDropdown from "@/components/Dropdowns/IntervalDropdown";

const getDaysAgo = (daysBack: number) => {
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - daysBack);
  return timestamp.getTime();
};

export default function ChartPage() {
  const [ticker, setTicker] = useState<string>("SPY");
  const [interval, setInterval] = useState<number>(10);
  const [startPriceData, setStartPriceDate] = useState<number>(getDaysAgo(8));
  const [endPriceData, setEndPriceData] = useState<number>(getDaysAgo(0));
  const [priceData, setPriceData] = useState<BarData[]>([]);
  const [loadingPriceData, setLoadingPriceData] = useState<boolean>(true);
  const [chartErrored, setChartErrored] = useState<boolean>(false);

  useEffect(() => {
    loadPricing();
    loadBackupPricing();
  }, []);

  useEffect(() => {
    loadPricing();
    loadBackupPricing();
  }, [ticker, interval]);

  useEffect(() => {
    if (priceData.length != 0) {
      setLoadingPriceData(false);
    }
  }, [priceData]);

  const loadPricing = async () => {
    await getIntradayCandles(ticker, interval, startPriceData, endPriceData)
      .then((data) => {
        if (data.length == 0) {
        }
        setPriceData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setChartErrored(true);
      });
  };

  const loadBackupPricing = async () => {
    // await getIntradayCandles(ticker, interval, startPriceData, endPriceData)
    //   .then((data) => {
    //     setPriceData(data);
    //     if (chartErrored) {
    //       setChartErrored(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     setChartErrored(true);
    //   });
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center py-6 px-32">
        {loadingPriceData ? (
          <>
            <InfinitySpin width="200" color="#7c3aed" />
          </>
        ) : (
          <div className="w-full h-full rounded-lg border border-violet-600 p-2">
            <div className="flex flex-row items-center justify-between">
              <div className="">
                <TickerSearch ticker={ticker} setTicker={setTicker} />
              </div>
              <div className="">
                <IntervalDropdown
                  interval={interval}
                  setInterval={setInterval}
                />
              </div>
            </div>

            <div className="w-full h-5/6">
              {chartErrored ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-white">Error loading chart </p>
                </div>
              ) : (
                <Chart priceData={priceData} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

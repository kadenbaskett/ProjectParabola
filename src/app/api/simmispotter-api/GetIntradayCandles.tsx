import axios, { AxiosResponse } from "axios";
import {
  CandlestickData,
  HistogramData,
  LineData,
  Time,
} from "lightweight-charts";

interface ServerCandleResponse {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

export interface GetPriceReponse {
  candleData: CandlestickData[];
  volumeData: HistogramData[];
  indicators: LineData[][];
}

const convertToPriceResponse = (
  priceData: ServerCandleResponse[]
): GetPriceReponse => {
  const candleData: CandlestickData[] = priceData.map((candle) => ({
    time: (candle.t / 1000) as Time,
    open: candle.o,
    high: candle.h,
    low: candle.l,
    close: candle.c,
  }));

  const volumeData: HistogramData[] = priceData.map((candle) => ({
    time: (candle.t / 1000) as Time,
    value: candle.v,
    color: candle.o > candle.c ? "rgb(237, 58, 82)" : "rgb(82, 237, 58)",
  }));

  const indicator: LineData[] = priceData.map((candle) => ({
    time: (candle.t / 1000) as Time,
    value: candle.vw + candle.vw * 0.02,
    color: "rgb(58, 82, 237)",
  }));

  const response: GetPriceReponse = {
    candleData: candleData,
    volumeData: volumeData,
    indicators: [indicator],
  };

  return response;
};

export const getIntradayCandles = async (
  ticker: string,
  interval: number,
  startTimestamp: number,
  endTimestamp: number
): Promise<any> => {
  try {
    const url = `/api/pricing/getMinuteCandles?ticker=${ticker}&interval=${interval}&afterTimestamp=${startTimestamp}&beforeTimestamp=${endTimestamp}`;

    return await axios
      .get(url)
      .then((response: AxiosResponse) => {
        const responseData: ServerCandleResponse[] = response.data;
        const barData = convertToPriceResponse(responseData);
        return barData;
      })
      .catch((error: any) => {
        console.error("Error fetching minute candles:", error);
      });
    // /pricing/getMinuteCandles?ticker=AMC&interval=60&afterTimestamp=1687749201000&beforeTimestamp=1687922001000
  } catch (error: any) {
    console.log("error occured");
  }
};

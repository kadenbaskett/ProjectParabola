import axios, { AxiosResponse } from "axios";
import { CandlestickData, Time } from "lightweight-charts";

interface CandleResponse {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

const convertToBarSeries = (
  candleData: CandleResponse[]
): CandlestickData[] => {
  const barData: CandlestickData[] = candleData.map((candle) => ({
    time: (candle.t / 1000) as Time, // Unix timestamp for time
    open: candle.o, // Open price
    high: candle.h, // High price
    low: candle.l, // Low price
    close: candle.c, // Close price
  }));

  return barData;
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
        const responseData: CandleResponse[] = response.data;
        const barData = convertToBarSeries(responseData);
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

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LineData } from "lightweight-charts";
import ChartPage from "./chart/page";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen items-stretch">
        <Navbar selectedTab={"home"} />
        <main className="bg-black p-auto h-full">
          <ChartPage />
          {/* <LoginPage /> */}
        </main>
        <Footer />
      </div>
    </>
  );
}

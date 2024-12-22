import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ForexData, TradingSignal } from "../types/forex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: ForexData[];
  signals: TradingSignal[];
}

export const ForexChart = ({ data, signals }: Props) => {
  const chartData = {
    labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "USD/JPY",
        data: data.map((d) => d.close),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Buy Signals",
        data: signals.filter((s) => s.signal === "BUY").map((s) => s.price),
        pointBackgroundColor: "green",
        pointRadius: 8,
        showLine: false,
      },
      {
        label: "Sell Signals",
        data: signals.filter((s) => s.signal === "SELL").map((s) => s.price),
        pointBackgroundColor: "red",
        pointRadius: 8,
        showLine: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

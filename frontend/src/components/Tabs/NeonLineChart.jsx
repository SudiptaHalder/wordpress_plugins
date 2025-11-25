import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function NeonLineChart({ timeline = [] }) {
  const labels = timeline.map((d) => d.date);
  const values = timeline.map((d) => d.visitors);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Visitors",
            data: values,
            borderColor: "#8a80ff",
            backgroundColor: "rgba(138, 128, 255, 0.3)",
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      }}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#ccc" } },
          y: { ticks: { color: "#ccc" } },
        },
      }}
    />
  );
}

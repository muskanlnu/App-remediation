import styles from "./Chart.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const Chart = ({ BlockerCounts, BlockerClasses }) => {
  const data = {
    labels: BlockerClasses,
    datasets: [
      {
        label: "Blockers",
        backgroundColor: "rgba(0,162,237, 0.6)",
        borderColor: "rgba(0,162,237, 1)",
        borderWidth: 1,
        data: BlockerCounts,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 15,
        bottom: 5,
      },
      margin: {
        left: 5,
        right: 5,
        top: 20,
        bottom: 5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,

        grid: {
          display: true, // Display grid lines for the y-axis
        },
        ticks: {
          padding: 15,
        },
      },
      x: {
        beginAtZero: true,
        border: { display: true },
        ticks: {
          padding: 7,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 5,
        borderWidth: 0.7,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;

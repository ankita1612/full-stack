import React, { useEffect } from "react";
import useFetch from "../utils/useFetch";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const CustomHook = () => {
  const { data, loading, error } = useFetch<Array<Record<string, any>>>(
    `${BACKEND_URL}/api/employee/static/forgraph`,
  );
  let map_data: any = {};
  map_data = {
    labels: ["a", "a", "a", "s", "s"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  if (Array.isArray(data)) {
    console.log(data);
    const input_labels = (data as Array<Record<string, any>>).map(
      (item: Record<string, any>) => {
        return Object.keys(item)[0];
      },
    );
    const amount = (data as Array<Record<string, any>>).map(
      (item: Record<string, any>) => {
        return Object.values(item)[0];
      },
    );
    console.log(amount);
    map_data = {
      labels: input_labels,
      datasets: [
        {
          label: "Sales",
          data: amount,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Monthly Sales" },
    },
  };

  return <Bar data={map_data} options={options} />;
};

export default CustomHook;

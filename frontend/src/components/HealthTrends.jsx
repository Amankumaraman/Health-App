import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HealthTrends = ({ data }) => {
  const parametersToShow = data.slice(0, 3); // Show top 3 parameters

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Current'],
    datasets: parametersToShow.map((param, i) => {
      const values = [
        param.value * (0.85 + Math.random() * 0.1),
        param.value * (0.9 + Math.random() * 0.1),
        param.value * (0.95 + Math.random() * 0.1),
        param.value,
      ].map((v) => Number(v.toFixed(1)));

      return {
        label: param.parameter,
        data: values,
        borderColor: `hsl(${i * 120}, 70%, 50%)`,
        backgroundColor: `hsla(${i * 120}, 70%, 50%, 0.1)`,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8 w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Health Trends</h2>
      <div className="h-64 sm:h-72 md:h-80 lg:h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HealthTrends;

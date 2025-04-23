import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface AcceptanceChartProps {
  data: number[];
  labels?: string[];
}

export const AcceptanceChart: React.FC<AcceptanceChartProps> = ({ data, labels }) => {
  const getLastSevenDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const labels = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      labels.push(days[date.getDay()]);
    }
    
    return labels;
  };

  const chartData = {
    labels: labels || getLastSevenDays(),
    datasets: [
      {
        label: 'Acceptance Rate',
        data: data,
        borderColor: '#92E3A9',
        backgroundColor: 'rgba(146, 227, 169, 0.3)', // Increased opacity for more visible fill
        pointBackgroundColor: '#92E3A9',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#92E3A9',
        fill: 'start', // Changed to 'start' to fill from the top
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#ffffff',
        titleColor: '#6b7280',
        bodyColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        usePointStyle: false,
        boxPadding: 4,
        titleFont: { size: 10 },
        bodyFont: { size: 12, weight: 'bold' as const },
        callbacks: {
          label: function(context: any) {
            return `Rate: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 30,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: '#6b7280',
          font: { size: 10 }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: '#6b7280',
          font: { size: 10 }
        }
      },
    },
    elements: {
      line: {
        tension: 1,
      },
      point: {
        radius: 0,
        hoverRadius: 5,
        hoverBorderWidth: 2,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Acceptance
        </h3>
      </div>
      <div className="h-[250px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from '../types/dashboard.types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityChartProps {
  data: ChartData;
  timeRange: 'weekly' | 'monthly' | 'yearly';
  onTimeRangeChange: (range: 'weekly' | 'monthly' | 'yearly') => void;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
}) => {
  // Customize data to match website theme colors
  const customData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: data.labels.map((_, index) => 
        index === 4 ? 'rgba(146, 227, 169, 0.8)' : 'rgba(191, 234, 201, 0.4)'
      ),
      hoverBackgroundColor: data.labels.map((_, index) => 
        index === 4 ? 'rgba(146, 227, 169, 1)' : 'rgba(191, 234, 201, 0.7)'
      ),
      borderRadius: 6,
    }))
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#BFEAC9',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `Applications: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full max-h-[530px] w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Activity
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Average applications
          </span>
        </div>
        <div className="relative">
          <select
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-[#92E3A9] focus:outline-none focus:ring-2 focus:ring-[#BFEAC9]/20"
            value={timeRange}
            onChange={(e) =>
              onTimeRangeChange(e.target.value as 'weekly' | 'monthly' | 'yearly')
            }
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className=" h-full pb-16 flex justify-center items-center">
        <Bar options={options} data={customData} />
      </div>
    </div>
  );
}; 
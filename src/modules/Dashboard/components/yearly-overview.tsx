import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface YearlyOverviewProps {
  data: {
    acceptance: number;
    refusals: number;
  };
}

export const YearlyOverview: React.FC<YearlyOverviewProps> = ({ data }) => {
  const chartData = {
    labels: ['Acceptance', 'Refusals'],
    datasets: [
      {
        data: [data.acceptance, data.refusals],
        backgroundColor: ['#92E3A9', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 20,
          font: {
            family: 'Poppins',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}%`;
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#BFEAC9',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
      },
    },
  };

  return (
    <div className="h-[382px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md  sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Yearly Overview
          </h3>
        </div>
        <div className="relative">
          <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-[#92E3A9] focus:outline-none focus:ring-2 focus:ring-[#BFEAC9]/20">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="flex h-[180px] items-center justify-center">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4 flex justify-center space-x-8">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#92E3A9]"></div>
          <span className="ml-2 text-sm">{data.acceptance}%</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span className="ml-2 text-sm">{data.refusals}%</span>
        </div>
      </div>
    </div>
  );
}; 
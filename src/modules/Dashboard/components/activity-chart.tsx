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
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
}) => {
  const customData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: data.labels.map((_, index) => 
        index === 4 ? 'rgba(146, 227, 169, 0.8)' : 'rgba(191, 234, 201, 0.4)' 
      ),
      hoverBackgroundColor: data.labels.map((_, index) => 
        index === 4 ? 'rgba(146, 227, 169, 1)' : 'rgba(191, 234, 201, 0.7)' // Darker hover for highlighted bar
      ),
      borderRadius: 6,
      barThickness: 20, // Adjust bar thickness if needed
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const, // Show tooltip for the bar index
        intersect: false,
        backgroundColor: '#ffffff', // White tooltip background
        titleColor: '#6b7280', // Gray title color (Tailwind gray-500)
        bodyColor: '#111827', // Dark body color (Tailwind gray-900)
        borderColor: '#e5e7eb', // Light gray border (Tailwind gray-200)
        borderWidth: 1,
        padding: 10,
        usePointStyle: false,
        boxPadding: 4,
        titleFont: { size: 10 },
        bodyFont: { size: 12, weight: 'bold' as const },
        // Add a caret like in the image
        caretSize: 6,
        caretPadding: 5,
        // Adjust position if needed (e.g., 'nearest', 'average')
        position: 'average' as const, 
        callbacks: {
          // Tooltip title (e.g., day label)
          title: function(tooltipItems: any) { 
            return tooltipItems[0].label;
          },
          label: function(context: any) {
            // Just show the value
            return `${context.parsed.y} Applications`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)', // Lighter grid lines
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
          display: false, // Hide vertical grid lines
        },
        ticks: {
          padding: 10,
          color: '#6b7280',
          font: { size: 10 }
        }
      },
    },
     interaction: {
        mode: 'index' as const, // Ensure interaction mode is index for bars
        intersect: false,
    }
  };

  return (
    // Container styling: White background, padding, rounded, shadow, border
    <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Activity
          </h3>
          <span className="text-sm text-gray-500">
            Average applications
          </span>
        </div>
      </div>
       <div className="h-[250px]">
        <Bar options={options} data={customData} />
      </div>
    </div>
  );
}; 
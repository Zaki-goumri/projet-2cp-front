// acceptance-chart.tsx
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
import { ChartData } from '../types/dashboard.types';

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
  data: ChartData;
}

export const AcceptanceChart: React.FC<AcceptanceChartProps> = ({ data }) => {
  const customData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderColor: '#92E3A9', 
      backgroundColor: 'rgba(146, 227, 169, 0.1)',
      pointBackgroundColor: '#92E3A9',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#92E3A9',
      fill: true, 
      tension: 0.4,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow height to be controlled by container
    plugins: {
      legend: {
        display: false, // Hide legend as per image
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const, // Show tooltip for the nearest point on hover
        intersect: false,
        backgroundColor: '#ffffff', // White tooltip background
        titleColor: '#6b7280', // Gray title color (Tailwind gray-500)
        bodyColor: '#111827', // Dark body color (Tailwind gray-900)
        borderColor: '#e5e7eb', // Light gray border (Tailwind gray-200)
        borderWidth: 1,
        padding: 10,
        usePointStyle: false, // Don't use point style in tooltip
        boxPadding: 4,
        titleFont: { size: 10 },
        bodyFont: { size: 12, weight: 'bold' as const },
        // Custom tooltip rendering could be added here if needed for exact styling
        callbacks: {
          // Format title (e.g., month label) if needed
          // title: function(tooltipItems: any) { return tooltipItems[0].label; },
          label: function(context: any) {
            // Display the value with a % sign perhaps?
            return `Rate: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)', // Lighter grid lines (Tailwind gray-200)
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: '#6b7280', // Gray axis labels (Tailwind gray-500)
          font: { size: 10 }
        }
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          padding: 10,
          color: '#6b7280', // Gray axis labels
          font: { size: 10 }
        }
      },
    },
    elements: {
      line: {
        tension: 1, 
      },
      point: {
        radius: 0, // Hide points by default
        hoverRadius: 5, // Show point on hover
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
    // Container styling: White background, padding, rounded, shadow, border
    <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Acceptance
        </h3>
        
      </div>
      <div className="h-[250px]"> 
         <Line options={options} data={customData} />
      </div>
    </div>
  );
};

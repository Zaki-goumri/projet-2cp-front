import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface YearlyOverviewProps {
  accepted_ratio: number;
  refused_ratio: number;
}

export const YearlyOverview: React.FC<YearlyOverviewProps> = ({ accepted_ratio, refused_ratio }) => {
  const acceptancePercent = (accepted_ratio * 100).toFixed(0);
  const refusalPercent = (refused_ratio * 100).toFixed(0);
  const otherPercent = 100 - parseFloat(acceptancePercent) - parseFloat(refusalPercent);

  const data = {
    labels: ['Acceptance', 'Refusals', 'Other'],
    datasets: [
      {
        label: 'Application Status',
        data: [acceptancePercent, refusalPercent, otherPercent > 0 ? otherPercent : 0],
        backgroundColor: [
          '#92E3A9',
          '#FCA5A5',
          '#E5E7EB',
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 20,
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data: number, i: number) => ({
              text: `${chart.data.labels[i]} ${data}%`,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].borderColor[i],
              lineWidth: datasets[0].borderWidth,
              hidden: isNaN(datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
              index: i
            }));
          }
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      },
    },
  };

  return (
    <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Your Report
        </h3>
      </div>
      <div className="mx-auto flex h-[250px] w-full max-w-[250px] items-center justify-center py-4">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default YearlyOverview; 
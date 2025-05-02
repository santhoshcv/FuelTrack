import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface DeviceChartProps {
  data: { device: string; volume: number }[];
  isLoading?: boolean;
}

const DeviceChart: React.FC<DeviceChartProps> = ({ data, isLoading = false }) => {
  const { theme } = useTheme();
  const chartRef = useRef<ChartJS<'doughnut'>>(null);

  useEffect(() => {
    // Update chart colors when theme changes
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div className="card h-72 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="flex items-center justify-center">
          <div className="h-48 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  const chartData: ChartData<'doughnut'> = {
    labels: data.map((item) => item.device),
    datasets: [
      {
        data: data.map((item) => item.volume),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: theme === 'dark' 
          ? 'rgba(30, 41, 59, 1)' 
          : 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          color: theme === 'dark' ? '#cbd5e1' : '#334155',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
        titleColor: theme === 'dark' ? '#ffffff' : '#1e293b',
        bodyColor: theme === 'dark' ? '#cbd5e1' : '#334155',
        borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => `Volume: ${context.raw} L (${context.parsed}%)`,
        },
      },
    },
    cutout: '65%',
  };

  return (
    <div className="card h-72">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Fuel Consumption by Device
        </h3>
      </div>
      <div className="h-56 flex items-center justify-center">
        <Doughnut ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DeviceChart;
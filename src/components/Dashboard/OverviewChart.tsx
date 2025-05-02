import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface OverviewChartProps {
  data: { month: string; volume: number }[];
  isLoading?: boolean;
}

const OverviewChart: React.FC<OverviewChartProps> = ({ data, isLoading = false }) => {
  const { theme } = useTheme();
  const chartRef = useRef<ChartJS<'bar'>>(null);

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
        <div className="h-56 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
      </div>
    );
  }

  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Fuel Volume (L)',
        data: data.map((item) => item.volume),
        backgroundColor: theme === 'dark' 
          ? 'rgba(59, 130, 246, 0.5)' 
          : 'rgba(59, 130, 246, 0.8)',
        borderColor: theme === 'dark'
          ? 'rgba(59, 130, 246, 0.8)'
          : 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: theme === 'dark'
          ? 'rgba(59, 130, 246, 0.7)'
          : 'rgba(59, 130, 246, 1)',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
          title: (context: any) => `${context[0].label}`,
          label: (context: any) => `Volume: ${context.raw} L`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card h-72">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Monthly Fuel Consumption
        </h3>
      </div>
      <div className="h-56">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OverviewChart;
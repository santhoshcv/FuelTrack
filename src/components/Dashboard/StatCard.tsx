import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  isLoading = false,
}) => {
  return (
    <div className="card hover:shadow-md transition-all duration-300 animate-fade-in">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          </div>
          
          {change !== undefined && (
            <div className="mt-3 flex items-center">
              <span className={`text-sm font-medium ${
                change >= 0 
                  ? 'text-success-700 dark:text-success-500' 
                  : 'text-error-700 dark:text-error-500'
              }`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {changeLabel || 'vs last period'}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;
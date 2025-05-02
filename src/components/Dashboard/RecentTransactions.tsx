import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Transaction {
  id: number;
  device_id: string;
  rfid: number;
  volume: number;
  timestamp: string;
  created_at: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ 
  transactions, 
  isLoading = false 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        <Link 
          to="/transactions" 
          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div 
            key={transaction.id} 
            className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
          >
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {transaction.device_id.substring(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.device_id}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Card: {transaction.rfid}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {transaction.volume.toFixed(2)} L
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(transaction.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            No recent transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
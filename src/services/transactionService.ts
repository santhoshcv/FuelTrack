import { mockTransactions } from '../data/mockData';

export const getTransactions = async (filter = {}) => {
  // In a real app, this would fetch data from your API with filters
  return new Promise((resolve) => {
    setTimeout(() => {
      // Apply any filtering logic here
      resolve(mockTransactions);
    }, 500);
  });
};

export const getTransactionById = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const transaction = mockTransactions.find(t => t.id === id);
      if (transaction) {
        resolve(transaction);
      } else {
        reject(new Error('Transaction not found'));
      }
    }, 300);
  });
};

export const getTransactionStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate statistics from transactions
      const totalVolume = mockTransactions.reduce((sum, t) => sum + t.volume, 0);
      const deviceStats = mockTransactions.reduce((acc, t) => {
        acc[t.device_id] = (acc[t.device_id] || 0) + t.volume;
        return acc;
      }, {} as Record<string, number>);
      
      resolve({
        totalVolume,
        totalTransactions: mockTransactions.length,
        deviceStats,
      });
    }, 500);
  });
};
import { useState, useEffect } from 'react';
import { Fuel, Users, BarChart4, Calendar } from 'lucide-react';
import PageHeader from '../components/UI/PageHeader';
import StatCard from '../components/Dashboard/StatCard';
import OverviewChart from '../components/Dashboard/OverviewChart';
import DeviceChart from '../components/Dashboard/DeviceChart';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import { getTransactions, getTransactionStats } from '../services/transactionService';
import { getFuelUsers } from '../services/userService';
import { mockTransactions, monthlyTransactionData, fuelConsumptionByUser } from '../data/mockData';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVolume: 0,
    totalTransactions: 0,
    activeUsers: 0,
    deviceStats: {} as Record<string, number>,
  });
  const [transactions, setTransactions] = useState(mockTransactions);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [transactionStats, transactionsData, usersData] = await Promise.all([
          getTransactionStats(),
          getTransactions(),
          getFuelUsers(),
        ]);
        
        setStats({
          ...transactionStats as any,
          activeUsers: usersData.filter((user: any) => user.status === 'Active').length,
        });
        
        setTransactions(transactionsData as any);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const volumeChange = 8.5; // Example change percentage
  const transactionsChange = 12.3;
  const activeUsersChange = 0;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your fuel management system" 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Fuel Dispensed"
          value={`${stats.totalVolume.toFixed(2)} L`}
          icon={<Fuel size={20} />}
          change={volumeChange}
          changeLabel="vs. last month"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon={<BarChart4 size={20} />}
          change={transactionsChange}
          changeLabel="vs. last month"
          isLoading={isLoading}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<Users size={20} />}
          change={activeUsersChange}
          changeLabel="vs. last month"
          isLoading={isLoading}
        />
        <StatCard
          title="Today's Date"
          value={new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
          icon={<Calendar size={20} />}
          isLoading={isLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart data={monthlyTransactionData} isLoading={isLoading} />
        <DeviceChart data={Object.entries(fuelConsumptionByUser).map(([device, volume]) => ({
          device,
          volume: typeof volume === 'number' ? volume : parseFloat(volume as any),
        }))} isLoading={isLoading} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
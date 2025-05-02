import { useState } from 'react';
import { Download, FileText, BarChart, PieChart } from 'lucide-react';
import PageHeader from '../components/UI/PageHeader';
import { monthlyTransactionData, fuelConsumptionByUser, devicePerformanceData } from '../data/mockData';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const generateReport = () => {
    // This would generate the selected report in a real app
    alert(`Generating ${reportType} report from ${dateRange.startDate} to ${dateRange.endDate}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and download various reports from your fuel management system"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="p-4 rounded-t-lg bg-primary-600 text-white flex items-center justify-center">
            <FileText size={28} />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Transaction Report
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Detailed report of all fuel transactions within a specified period
            </p>
            <button className="btn-outline w-full">Generate</button>
          </div>
        </div>

        <div className="card hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="p-4 rounded-t-lg bg-secondary-600 text-white flex items-center justify-center">
            <BarChart size={28} />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Usage Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Analyze fuel consumption patterns across different users and periods
            </p>
            <button className="btn-outline w-full">Generate</button>
          </div>
        </div>

        <div className="card hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="p-4 rounded-t-lg bg-accent-500 text-white flex items-center justify-center">
            <PieChart size={28} />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Device Performance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Report on dispenser device performance, efficiency, and status
            </p>
            <button className="btn-outline w-full">Generate</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Custom Report
        </h3>
        
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="report_type" className="form-label">Report Type</label>
            <select
              id="report_type"
              className="form-input"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="quarterly">Quarterly Report</option>
              <option value="annual">Annual Report</option>
              <option value="custom">Custom Period</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="start_date" className="form-label">Start Date</label>
              <input
                type="date"
                id="start_date"
                className="form-input"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end_date" className="form-label">End Date</label>
              <input
                type="date"
                id="end_date"
                className="form-input"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="report_format" className="form-label">Format</label>
            <select
              id="report_format"
              className="form-input"
              defaultValue="pdf"
            >
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV File</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Include in Report</label>
            <div className="space-y-2 mt-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="include_summary"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="include_summary" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Summary Dashboard
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="include_transactions"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="include_transactions" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Transaction Details
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="include_charts"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="include_charts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Charts and Graphs
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="include_device"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="include_device" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Device Performance
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={generateReport}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Download size={16} />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Scheduled Reports
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Daily Summary
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Sent every day at 9:00 AM
                  </p>
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Recipients: admin@example.com, operations@example.com</p>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Weekly Performance
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Sent every Monday at 8:00 AM
                  </p>
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Recipients: manager@example.com</p>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Monthly Usage Report
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Sent on the 1st of each month
                  </p>
                </div>
                <span className="badge badge-warning">Paused</span>
              </div>
              <div className="flex items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p>Recipients: finance@example.com, director@example.com</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn-outline">
              Manage Scheduled Reports
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Reports
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  May 2025 - Monthly Report
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Generated on Jun 1, 2025
                </p>
              </div>
              <button className="btn-ghost p-2">
                <Download size={18} />
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Q1 2025 - Quarterly Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Generated on Apr 5, 2025
                </p>
              </div>
              <button className="btn-ghost p-2">
                <Download size={18} />
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  PUMP001 - Device Performance Report
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Generated on May 15, 2025
                </p>
              </div>
              <button className="btn-ghost p-2">
                <Download size={18} />
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Custom Report - Apr 15-30, 2025
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Generated on May 2, 2025
                </p>
              </div>
              <button className="btn-ghost p-2">
                <Download size={18} />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn-outline">
              View All Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
import { useState, useEffect } from 'react';
import { Edit, FileDown, Eye, Filter, Calendar, RefreshCcw } from 'lucide-react';
import PageHeader from '../components/UI/PageHeader';
import DataTable from '../components/UI/DataTable';
import Modal from '../components/UI/Modal';
import { getTransactions, getTransactionById } from '../services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getTransactions();
      setTransactions(data as any);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const transaction = await getTransactionById(id);
      setSelectedTransaction(transaction as any);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const transaction = await getTransactionById(id);
      setSelectedTransaction(transaction as any);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching transaction for edit:', error);
    }
  };

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert('Export functionality would go here');
  };

  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      key: 'device_id',
      header: 'Device',
      sortable: true,
    },
    {
      key: 'rfid',
      header: 'RFID',
      sortable: true,
    },
    {
      key: 'volume',
      header: 'Volume (L)',
      sortable: true,
      render: (value: number) => value.toFixed(2),
    },
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      key: 'created_at',
      header: 'Created At',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  const renderActions = (transaction: any) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleView(transaction.id)}
        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        title="View"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={() => handleEdit(transaction.id)}
        className="p-1 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
        title="Edit"
      >
        <Edit size={18} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transaction History"
        description="View and manage fuel dispensing transactions"
        actions={
          <>
            <button 
              className="btn-outline flex items-center gap-1"
              onClick={() => setIsViewModalOpen(true)}
            >
              <Calendar size={16} />
              <span>Filter by Date</span>
            </button>
            <button 
              className="btn-primary flex items-center gap-1"
              onClick={handleExport}
            >
              <FileDown size={16} />
              <span>Export</span>
            </button>
          </>
        }
      />

      <DataTable
        columns={columns}
        data={transactions}
        isLoading={isLoading}
        actions={renderActions}
        searchable
        filterable
      />

      {/* View Transaction Modal */}
      {selectedTransaction && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Transaction Details"
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedTransaction as any).id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Device</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedTransaction as any).device_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">RFID</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedTransaction as any).rfid}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Volume</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedTransaction as any).volume.toFixed(2)} L</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date((selectedTransaction as any).timestamp).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date((selectedTransaction as any).created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Transaction Modal */}
      {selectedTransaction && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Transaction"
          size="md"
          footer={
            <>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save logic would go here
                  setIsEditModalOpen(false);
                }}
                className="btn-primary"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="form-group">
              <label htmlFor="device_id" className="form-label">Device ID</label>
              <input
                type="text"
                id="device_id"
                className="form-input"
                defaultValue={(selectedTransaction as any).device_id}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rfid" className="form-label">RFID</label>
              <input
                type="text"
                id="rfid"
                className="form-input"
                defaultValue={(selectedTransaction as any).rfid}
              />
            </div>
            <div className="form-group">
              <label htmlFor="volume" className="form-label">Volume (L)</label>
              <input
                type="number"
                id="volume"
                step="0.01"
                className="form-input"
                defaultValue={(selectedTransaction as any).volume}
              />
            </div>
            <div className="form-group">
              <label htmlFor="timestamp" className="form-label">Timestamp</label>
              <input
                type="datetime-local"
                id="timestamp"
                className="form-input"
                defaultValue={(selectedTransaction as any).timestamp.replace(' ', 'T').substring(0, 16)}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Date Filter Modal */}
      <Modal
        isOpen={isViewModalOpen && !selectedTransaction}
        onClose={() => setIsViewModalOpen(false)}
        title="Filter by Date Range"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Apply date filter logic would go here
                setIsViewModalOpen(false);
              }}
              className="btn-primary"
            >
              Apply Filter
            </button>
          </>
        }
      >
        <div className="space-y-4">
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
      </Modal>
    </div>
  );
};

export default Transactions;
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  actions?: (item: any) => React.ReactNode;
  searchable?: boolean;
  filterable?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  isLoading = false,
  pagination = true,
  itemsPerPage = 10,
  actions,
  searchable = true,
  filterable = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search and filter
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    
    // Search through all columns
    return Object.keys(item).some((key) => {
      const value = item[key];
      return String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    return sortDirection === 'asc'
      ? (valueA > valueB ? 1 : -1)
      : (valueA < valueB ? 1 : -1);
  });

  // Pagination
  const totalPages = pagination ? Math.ceil(sortedData.length / itemsPerPage) : 1;
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData;

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="table-container animate-pulse">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-t-lg">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 overflow-hidden">
          <div className="h-12 bg-gray-100 dark:bg-gray-900"></div>
          {[...Array(5)].map((_, idx) => (
            <div 
              key={idx} 
              className="h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            ></div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/5"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {searchable && (
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
          
          {filterable && (
            <div className="flex-shrink-0">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="btn-ghost flex items-center gap-1"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Filters Panel */}
      {filterable && isFilterOpen && (
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Add filter controls here */}
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-input">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date From</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Date To</label>
              <input type="date" className="form-input" />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="btn-ghost">Clear</button>
            <button className="btn-primary">Apply Filters</button>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="table-header">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="table-header-cell"
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && sortColumn === column.key && (
                      <span>
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="table-header-cell">Actions</th>}
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="table-row">
                  {columns.map((column) => (
                    <td key={column.key} className="table-cell">
                      {column.render 
                        ? column.render(item[column.key], item) 
                        : String(item[column.key] !== undefined ? item[column.key] : '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="table-cell">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (actions ? 1 : 0)} 
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, sortedData.length)}
                </span>{' '}
                of <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronUp className="h-5 w-5 rotate-270 transform" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isActive = pageNumber === currentPage;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        isActive
                          ? 'z-10 bg-primary-600 text-white focus:z-20 focus-visible:outline'
                          : 'text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 rotate-90 transform" />
                </button>
              </nav>
            </div>
          </div>
          <div className="flex sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`btn-ghost mr-2 ${currentPage === 1 ? 'opacity-50' : ''}`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`btn-ghost ${currentPage === totalPages ? 'opacity-50' : ''}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
import { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Eye } from 'lucide-react';
import PageHeader from '../components/UI/PageHeader';
import DataTable from '../components/UI/DataTable';
import Modal from '../components/UI/Modal';
import { getFuelUsers, getFuelUserById } from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getFuelUsers();
      setUsers(data as any);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = async (id: number) => {
    try {
      const user = await getFuelUserById(id);
      setSelectedUser(user as any);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const user = await getFuelUserById(id);
      setSelectedUser(user as any);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching user for edit:', error);
    }
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'card',
      header: 'Card',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`badge ${
          value === 'Active' 
            ? 'badge-success' 
            : 'badge-error'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'acess',
      header: 'Access',
      sortable: true,
    },
    {
      key: 'updated_at',
      header: 'Updated At',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  const renderActions = (user: any) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleView(user.id)}
        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        title="View"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={() => handleEdit(user.id)}
        className="p-1 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
        title="Edit"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => handleDelete(user)}
        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users Management"
        description="Manage users who can access fuel dispensers"
        actions={
          <button 
            className="btn-primary flex items-center gap-1"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        actions={renderActions}
        searchable
      />

      {/* View User Modal */}
      {selectedUser && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="User Details"
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedUser as any).id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedUser as any).name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company ID</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedUser as any).companyid}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Card</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedUser as any).card}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                <p className="mt-1">
                  <span className={`badge ${
                    (selectedUser as any).status === 'Active' 
                      ? 'badge-success' 
                      : 'badge-error'
                  }`}>
                    {(selectedUser as any).status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Access</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{(selectedUser as any).acess}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated At</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date((selectedUser as any).updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit User"
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
                  fetchUsers(); // Refresh the list
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
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
                defaultValue={(selectedUser as any).name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card" className="form-label">Card Number</label>
              <input
                type="text"
                id="card"
                className="form-input"
                defaultValue={(selectedUser as any).card}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                className="form-input"
                defaultValue={(selectedUser as any).status}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="access" className="form-label">Access Level</label>
              <select
                id="access"
                className="form-input"
                defaultValue={(selectedUser as any).acess}
              >
                <option value="Std">Standard</option>
                <option value="Admin">Admin</option>
                <option value="Limited">Limited</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New User"
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Create user logic would go here
                setIsCreateModalOpen(false);
                fetchUsers(); // Refresh the list
              }}
              className="btn-primary"
            >
              Create User
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="new_name" className="form-label">Name</label>
            <input
              type="text"
              id="new_name"
              className="form-input"
              placeholder="Enter user name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new_card" className="form-label">Card Number</label>
            <input
              type="text"
              id="new_card"
              className="form-input"
              placeholder="Enter card number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new_status" className="form-label">Status</label>
            <select
              id="new_status"
              className="form-input"
              defaultValue="Active"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="new_access" className="form-label">Access Level</label>
            <select
              id="new_access"
              className="form-input"
              defaultValue="Std"
            >
              <option value="Std">Standard</option>
              <option value="Admin">Admin</option>
              <option value="Limited">Limited</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      {selectedUser && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Deletion"
          size="sm"
          footer={
            <>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Delete logic would go here
                  setIsDeleteModalOpen(false);
                  fetchUsers(); // Refresh the list
                }}
                className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete user <span className="font-semibold">{(selectedUser as any).name}</span>? This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Users;
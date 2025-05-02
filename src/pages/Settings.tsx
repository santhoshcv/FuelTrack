import { useState } from 'react';
import { Save, User } from 'lucide-react';
import PageHeader from '../components/UI/PageHeader';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  const formatRole = (role?: string): string => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user profile
    setNotification({
      type: 'success',
      message: 'Profile updated successfully!',
    });

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setNotification({
        type: 'error',
        message: 'New passwords do not match',
      });
      return;
    }

    // In a real app, this would call an API to update the password
    setNotification({
      type: 'success',
      message: 'Password updated successfully!',
    });

    // Clear form and notification after 3 seconds
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your Settings"
        description="Manage your account settings and change your password"
      />

      {notification && (
        <div className={`p-4 rounded-md ${
          notification.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        } animate-fade-in`}>
          {notification.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Profile Information
          </h3>
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  disabled  // Email changes might require verification in a real app
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Email address cannot be changed.
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="role" className="form-label">Role</label>
                <input
                  type="text"
                  id="role"
                  className="form-input"
                  value={user?.role || ''}
                  disabled
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="card lg:col-span-1 flex flex-col items-center justify-center text-center p-8">
          <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
            <User size={48} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {user?.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {user?.email}
          </p>
          <div className="badge badge-success">
            {formatRole(user?.role)}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Change Password
        </h3>
        <form onSubmit={handlePasswordUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="form-input"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-input"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save size={16} />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

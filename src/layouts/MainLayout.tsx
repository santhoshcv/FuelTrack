import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PanelLeftClose,
  PanelLeft, 
  Users, 
  FileText,
  History,
  User,
  LogOut,
  Sun,
  Moon,
  Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isSidebarOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, isSidebarOpen }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-md transition-all ${
        isActive 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {isSidebarOpen && <span className="ml-3 transition-all">{label}</span>}
    </Link>
  );
};

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const routes = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/transactions', icon: <History size={20} />, label: 'Transactions' },
    { to: '/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/reports', icon: <FileText size={20} />, label: 'Reports' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
              FuelTrack
            </h1>
          ) : (
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">FT</span>
          )}
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {routes.map((route) => (
            <NavItem
              key={route.to}
              to={route.to}
              icon={route.icon}
              label={route.label}
              isActive={pathname === route.to}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </nav>

        {/* User and Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <div className="flex items-center justify-between p-2">
            <button 
              onClick={toggleTheme} 
              className="flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button 
              onClick={logout}
              className="flex items-center justify-center p-2 rounded-md text-red-500 hover:text-red-700 dark:hover:text-red-400"
            >
              <LogOut size={20} />
            </button>
          </div>

          {isSidebarOpen && (
            <div className="flex items-center space-x-3 p-2">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white uppercase">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
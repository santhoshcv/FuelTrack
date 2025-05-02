import { Link } from 'react-router-dom';
import { ArrowLeft, Fuel } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Fuel size={64} className="mx-auto text-primary-600 dark:text-primary-400 mb-6" />
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/dashboard" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
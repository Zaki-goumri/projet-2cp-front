import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-gray-700">Page Not Found</h2>
      <p className="mt-4 text-center text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound; 
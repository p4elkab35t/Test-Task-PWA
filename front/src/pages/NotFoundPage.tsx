import React from 'react';
import NavUI from '../components/Nav.UI';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
    <NavUI />
    <div className="flex flex-col items-center justify-center mt-52 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Home
      </Link>
    </div>
    </div>
  );
};

export default NotFoundPage;

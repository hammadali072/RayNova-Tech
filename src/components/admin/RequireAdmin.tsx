import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  children: ReactNode;
}

export function RequireAdmin({ children }: Props) {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const location = useLocation();

  // Wait for authentication to load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a227]"></div>
          <p className="text-[#efe9d6] mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Not logged in -> send to login (preserve attempted location)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser?.role !== 'Admin') {
    // Logged in but not an admin -> deny
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default RequireAdmin;

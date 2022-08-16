import { useAuth } from './hooks/useAuth';
import { AdminEntries } from './pages/AdminEntries';
import { AdminReports } from './pages/AdminReports';
import { UserDashboard } from './pages/UserDashboard';
import { Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="">
      {!isAdmin && <UserDashboard />}
      {isAdmin && (
        <Routes>
          <Route path="entries" element={<AdminEntries />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="*" element={<Navigate to="entries" />} />
        </Routes>
      )}
    </div>
  );
};

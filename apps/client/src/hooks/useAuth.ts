import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { UserRole } from '@calories-tracker/api-interfaces';

export const useAuth = () => {
  if (!document.cookie) return {};
  const cookies = new Cookies();
  const token = cookies.get('AuthToken') || '';
  const decoded = jwtDecode(token) as {
    _id: string;
    roles: UserRole[];
    caloriesGoal: number;
  };

  const { _id, roles, caloriesGoal } = decoded;
  const isAdmin = roles?.includes(UserRole.admin);

  return { _id, isAdmin, caloriesGoal };
};

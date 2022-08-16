import { User } from '@calories-tracker/api-interfaces';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';

export const useUsers = () => {
  const { isAdmin } = useAuth();

  return useQuery<User[]>(['/api/admin/users'], { enabled: isAdmin });
};

export const useIndexedUsers = () => {
  const { data, ...rest } = useUsers();
  const indexedUsers = data?.reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {} as { [_id: string]: User });

  return { data: indexedUsers, ...rest };
};

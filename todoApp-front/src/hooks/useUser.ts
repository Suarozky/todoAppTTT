// hooks/useUser.ts
import useSWR from 'swr';
import { fetchUser } from '../services/dataService';

export const useUser = (userId: string) => {
  const { data, error } = useSWR(userId ? `/user/${userId}` : null, () => fetchUser(userId));
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
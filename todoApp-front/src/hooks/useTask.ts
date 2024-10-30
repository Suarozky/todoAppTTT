import useSWR from 'swr';
import { fetchTask } from '../services/dataService';

export const useTask = (taskId: string) => {
  const { data, error } = useSWR(taskId ? `/task/${taskId}` : null, () => fetchTask());
  return {
    task: data,
    isLoading: !error && !data,
    isError: error,
  };
};
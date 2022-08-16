import { FoodEntry } from '@calories-tracker/api-interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useFoodEntries = () => {
  return useQuery<FoodEntry[]>(['/api/food_entries']);
};

export const useCreateFoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<FoodEntry, unknown, Partial<FoodEntry>>(
    (data) => {
      return axios.post('/api/food_entries', data);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['/api/food_entries']);
      },
    }
  );
};

export const useUpdateFoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<FoodEntry, unknown, Partial<FoodEntry>>(
    (data) => {
      return axios.put(`/api/food_entries/${data._id}`, data);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['/api/food_entries']);
      },
    }
  );
};

export const useDeleteFoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string>(
    (id) => {
      return axios.delete(`/api/food_entries/${id}`);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['/api/food_entries']);
      },
    }
  );
};

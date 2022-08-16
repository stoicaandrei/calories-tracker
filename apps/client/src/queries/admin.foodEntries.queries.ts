import { FoodEntry } from '@calories-tracker/api-interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useAdminFoodEntries = () => {
  return useQuery<FoodEntry[]>(['/api/admin/food_entries']);
};

export const useAdminCreateFoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<FoodEntry, unknown, Partial<FoodEntry>>(
    (data) => {
      return axios.post('/api/admin/food_entries', data);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['/api/admin/food_entries']);
      },
    }
  );
};

export const useAdminUpdateFoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<FoodEntry, unknown, Partial<FoodEntry>>(
    (data) => {
      return axios.put(`/api/admin/food_entries/${data._id}`, data);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['/api/admin/food_entries']);
      },
    }
  );
};

export const useAdminDeleteFoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string>(
    (id) => {
      return axios.delete(`/api/admin/food_entries/${id}`);
    },
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(['/api/admin/food_entries']);
      },
    }
  );
};

import api from './api';
export interface User {
  id: number;
  username: string;
  email: string;
  status: boolean;
  role: string;
}
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};
export const createUser = async (user: Partial<User>): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};
export const updateUser = async (id: number, updates: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, updates);
  return response.data;
};
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
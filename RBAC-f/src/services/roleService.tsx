import api from './api';

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export const fetchRoles = async (): Promise<Role[]> => {
  const response = await api.get('/roles');
  return response.data;
};

export const createRole = async (role: Partial<Role>): Promise<Role> => {
  const response = await api.post('/roles', role);
  return response.data;
};

export const updateRole = async (id: number, updates: Partial<Role>): Promise<Role> => {
  const response = await api.put(`/roles/${id}`, updates);
  return response.data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await api.delete(`/roles/${id}`);
};

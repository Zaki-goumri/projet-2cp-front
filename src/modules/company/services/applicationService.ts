import axios from '@/api/axios.config';
import { ApplicationType } from '../types/application.types';

export const getApplicationDetails = async (id: string): Promise<ApplicationType> => {
  const { data } = await axios.get(`/app/web/${id}/`);
  return data;
};

export const updateApplicationStatus = async (id: number, status: string): Promise<ApplicationType> => {
  const { data } = await axios.patch(`/app/web/${id}/`, { status });
  return data;
}; 
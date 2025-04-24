import instance from "@/api/axios.config";
import { OpportunityData } from "../hooks/useOpportunity";

export const createInternshipService = async (data: OpportunityData) => {
  const response = await instance.post('/post/opportunity/', {
    ...data,
    category:'CS'
  });
  return response.data;
};

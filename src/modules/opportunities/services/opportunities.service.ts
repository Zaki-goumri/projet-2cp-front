import { mockOpportunities } from '../mocks/opportunities.mock';
import { Opportunity } from '../types/opportunity.types';

// Simulate API delay
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock Saved State --- A simple in-memory set for demo purposes
const savedPostIds = new Set<string | number>(['intern-1', 'problem-2']);
// -----------------------

const fetchOpportunities = async (): Promise<Opportunity[]> => {
  console.log('Simulating fetching all opportunities...');
  await delay(500); // Simulate network latency
  // In a real app, this would be an API call
  // e.g., const response = await axiosInstance.get('/opportunities');
  // return response.data;
  return mockOpportunities;
};

const fetchOpportunityById = async (
  id: string,
): Promise<Opportunity | undefined> => {
  console.log(`Simulating fetching opportunity with id: ${id}...`);
  await delay(300);
  // In a real app, this would be an API call
  // e.g., const response = await axiosInstance.get(`/opportunities/${id}`);
  // return response.data;
  const opportunity = mockOpportunities.find((opp) => opp.id.toString() === id);
  return opportunity;
};

// Add functions for fetching internships and problems separately if needed
const fetchInternships = async (): Promise<Opportunity[]> => {
  console.log('Simulating fetching internships...');
  await delay(400);
  return mockOpportunities.filter((opp) => opp.type === 'internship');
};

const fetchProblems = async (): Promise<Opportunity[]> => {
  console.log('Simulating fetching problems...');
  await delay(400);
  return mockOpportunities.filter((opp) => opp.type === 'problem');
};

// --- New Service Functions for Saving ---
const fetchSavedPostIds = async (): Promise<Set<string | number>> => {
  console.log('Simulating fetching saved post IDs...');
  await delay(200);
  return new Set(savedPostIds); // Return a copy
};

const savePost = async (postId: string | number): Promise<void> => {
  console.log(`Simulating saving post with id: ${postId}...`);
  await delay(150);
  if (!savedPostIds.has(postId)) {
    savedPostIds.add(postId);
    console.log('Post saved:', postId);
  } else {
    console.log('Post already saved:', postId);
  }
  // In real app: await axiosInstance.post(`/saved-posts`, { postId });
};

const unsavePost = async (postId: string | number): Promise<void> => {
  console.log(`Simulating unsaving post with id: ${postId}...`);
  await delay(150);
  if (savedPostIds.has(postId)) {
    savedPostIds.delete(postId);
    console.log('Post unsaved:', postId);
  } else {
    console.log('Post not found in saved list:', postId);
  }
  // In real app: await axiosInstance.delete(`/saved-posts/${postId}`);
};
// -------------------------------------

const opportunitiesService = {
  fetchOpportunities,
  fetchOpportunityById,
  fetchInternships,
  fetchProblems,
  // Add new functions
  fetchSavedPostIds,
  savePost,
  unsavePost,
  // Add other service functions like create, update, delete as needed
};

export default opportunitiesService; 
import axios from "@/api/axios.config";

export const opportunityService = {
  savePost: async (postId: number): Promise<void> => {
    try {
      await axios.post(`/Auth/post/${postId}/`);
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  },

  getSavedPosts: async (): Promise<number[]> => {
    try {
      const response = await axios.get('/Auth/post/saved/');
      return response.data.map((post: any) => post.id);
    } catch (error) {
      console.error('Error fetching saved posts:', error);
      throw error;
    }
  },
}; 
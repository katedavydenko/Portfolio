import { create } from "zustand";

export const useStore = create((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  likePost: (id) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      ),
    })),
}));
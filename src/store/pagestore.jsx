import { create } from 'zustand'

export const usePageSelection = create((set) => ({
  selectedPage: 'home',
  updateSelectedPage: (newPage) => set({ selectedPage: newPage }),
}));

export default { usePageSelection };
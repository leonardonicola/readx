import { create } from "zustand";

interface ProfileState {
  isEditing: boolean;
  toggleEditing: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  isEditing: false,
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing }))
}));

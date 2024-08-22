import { create } from "zustand";

interface BookshelfModalState {
  isOpen: boolean;
  toggleOpen: (open?: boolean) => void;
}

export const useBookshelfModalStore = create<BookshelfModalState>((set) => ({
  isOpen: false,
  toggleOpen: (open?: boolean) =>
    set((state) => ({ isOpen: open || !state.isOpen }))
}));

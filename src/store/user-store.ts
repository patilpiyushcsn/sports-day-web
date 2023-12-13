import { create } from "zustand";

type Store = {
  userId: string;
  setId: (userId: string) => void;
};

export const userStore = create<Store>()((set) => ({
  userId: "",
  setId: (userId: string) => set(() => ({ userId })),
}));

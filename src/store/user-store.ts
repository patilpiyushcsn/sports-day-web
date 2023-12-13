import { create } from "zustand";

// export const userStore = create((set) => ({
//   id: null,
//   setId: (id: string) => set(() => ({ id })),
// }))

type Store = {
  userId: string;
  setId: (userId: string) => void;
};

export const userStore = create<Store>()((set) => ({
  userId: "",
  setId: (userId: string) => set(() => ({ userId })),
}));

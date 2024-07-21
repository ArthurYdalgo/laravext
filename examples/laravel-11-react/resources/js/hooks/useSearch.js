import { text } from "body-parser";
import { create } from "zustand";

const useSearch = create((set) => ({
    text: "",
    tags: [],

    setText: (text) => set(() => ({ text })),
    setTags: (tags) => set(() => ({ tags })),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    clearTags: () => set(() => ({ tags: [] })),
}));

export default useSearch;

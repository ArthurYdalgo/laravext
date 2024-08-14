import { create } from "zustand";

const useSearch = create((set) => ({
    text: "",
    tags: [],

    setText: (text) => set(() => ({ text })),
    setTags: (tags) => set(() => ({ tags })),
    addTag: (tag, preventDuplicates = true) => set((state) => {
        if (preventDuplicates && state.tags.includes(tag)) {
            return { tags: state.tags };
        }

        return { tags: [...state.tags, tag] };
    }),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    clearTags: () => set(() => ({ tags: [] })),
}));

export default useSearch;

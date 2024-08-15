
import { create } from "zustand";

const useAllTags = create((set) => ({
    tags: [],
    loaded: false,

    setTags: (tags) => set(() => ({ tags })),
    setLoaded: (loaded) => set(() => ({ loaded }))
}));

export default useAllTags;

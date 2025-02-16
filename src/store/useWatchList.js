import { create } from "zustand";

const createWatchList = (set) => {
    return {
        watchList: [],
        addItem: (newItem) => {
            set(function (state) {
                let copied = [...state.watchList];

                if (!copied.includes(newItem)) {
                    copied.push(newItem);
                }

                return { watchList: copied };
            })
        },
        removeItem: (id) => {
            set(function (state) {
                let copied = [...state.watchList];
                let newCopied = copied.map((_, index) => index !== id);
                return { watchList: newCopied }
            })
        }
    }
}

const useWatchList = create(createWatchList);

export default useWatchList
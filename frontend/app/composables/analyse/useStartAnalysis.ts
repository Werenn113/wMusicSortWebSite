export const useStartAnalysis = () => {
    const { categories } = useCategoryManager();
    const { selectedTracks, updateTrackGenre } = useSelectedPlaylist();

    const isLoading = ref(false);
    const isFinish = ref(false)

    const startAnalysis = async () => {
        isLoading.value = true;

        try {
            const tracks = toRaw(selectedTracks.value);

            const result = await $fetch<GeminiClassifiedTrack[]>("/api/ai/class", {
                method: "POST",
                credentials: "include",
                body: {
                    categories: categories.value.map((cat) => cat.name),
                    tracks: tracks,
                },
            });

            result.forEach((classifiedTrack) => {
                updateTrackGenre(classifiedTrack.id, classifiedTrack.categories);
            });
        } finally {
            isLoading.value = false;
            isFinish.value = true
        }
    };

    return {
        isLoading,
        isFinish,
        startAnalysis,
    };
};
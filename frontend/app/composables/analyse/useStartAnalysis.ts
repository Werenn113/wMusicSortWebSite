export const useStartAnalysis = () => {
    const { categories } = useCategoryManager();
    const { selectedTracks, updateTrackGenre } = useSelectedPlaylist();

    const isLoading = ref(false);

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
                updateTrackGenre(classifiedTrack.id, classifiedTrack.category, classifiedTrack.confidence);
            });
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        startAnalysis,
    };
};
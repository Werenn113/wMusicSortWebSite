<script setup lang="ts">
type Owner = { id: string; display_name?: string };
type Playlist = {
  id: string;
  image: string[];
  name: string;
  owner: Owner;
  tracksCount: number;
  url?: string;
};

type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  duration_ms: number;
};

type Category = {
  id: string;
  name: string;
  color: string;
};

const {
  data: playlists,
  pending,
  error,
} = await useFetch<Playlist[]>("/api/spotify/playlists", {
  credentials: "include",
  server: false,
});

const selectedPlaylist = ref<Playlist | null>(null);
const tracks = ref<Track[]>([]);
const loadingTracks = ref(false);
const categories = ref<Category[]>([]);
const newCategoryName = ref("");
const isProcessing = ref(false);
const progress = ref(0);

const colorClasses = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-pink-500",
];

const selectPlaylist = async (playlist: Playlist) => {
  selectedPlaylist.value = playlist;
  loadingTracks.value = true;

  try {
    const response = await useFetch<Track[]>(
      `/api/spotify/playlists/${playlist.id}/tracks`,
      {
        credentials: "include",
        server: false,
      }
    );
    tracks.value = response.data.value || [];
  } catch (err) {
    console.error("Error loading tracks:", err);
    tracks.value = [];
  } finally {
    loadingTracks.value = false;
  }
};

const addCategory = () => {
  if (newCategoryName.value.trim()) {
    categories.value.push({
      id: Date.now().toString(),
      name: newCategoryName.value.trim(),
      color:
        colorClasses[categories.value.length % colorClasses.length] ||
        "bg-slate-500",
    });
    newCategoryName.value = "";
  }
};

const removeCategory = (categoryId: string) => {
  categories.value = categories.value.filter((c) => c.id !== categoryId);
};

const startProcessing = () => {
  if (!selectedPlaylist.value || categories.value.length === 0) {
    alert("Please select a playlist and create at least one category");
    return;
  }

  isProcessing.value = true;
  progress.value = 0;

  const interval = setInterval(() => {
    progress.value += 5;
    if (progress.value >= 100) {
      clearInterval(interval);
      isProcessing.value = false;
      progress.value = 100;
      setTimeout(() => {
        progress.value = 0;
      }, 2000);
    }
  }, 200);
};

definePageMeta({
  middleware: "spotify",
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6"
  >
    <!-- Header with controls -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h1 class="text-3xl font-bold text-white mb-6">
          <UIcon name="i-lucide-music" class="inline-block mr-2" />
          Spotify Playlist Sorting
        </h1>

        <!-- Category management -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-white mb-3">Categories</h3>
          <div class="flex gap-3 mb-3">
            <input
              v-model="newCategoryName"
              @keyup.enter="addCategory"
              type="text"
              placeholder="Category name"
              class="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <UButton
              @click="addCategory"
              color="primary"
              size="lg"
              class="px-6"
            >
              <UIcon name="i-lucide-plus" />
              Add
            </UButton>
          </div>

          <div class="flex flex-wrap gap-2 min-h-[40px]">
            <div
              v-for="cat in categories"
              :key="cat.id"
              :class="[
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium text-sm',
                cat.color,
              ]"
            >
              {{ cat.name }}
              <button
                @click="removeCategory(cat.id)"
                class="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            <div
              v-if="categories.length === 0"
              class="text-slate-400 italic text-sm py-2"
            >
              No categories created
            </div>
          </div>
        </div>

        <!-- Start button and progress bar -->
        <div class="flex gap-4 items-center">
          <UButton
            @click="startProcessing"
            :disabled="
              !selectedPlaylist || categories.length === 0 || isProcessing
            "
            color="primary"
            size="xl"
            class="px-8"
          >
            <UIcon
              :name="isProcessing ? 'i-lucide-loader-2' : 'i-lucide-play'"
              :class="{ 'animate-spin': isProcessing }"
            />
            {{ isProcessing ? "Processing..." : "Start Sorting" }}
          </UButton>

          <div
            v-if="progress > 0"
            class="flex-1 relative h-12 bg-slate-900 rounded-full overflow-hidden border border-slate-700"
          >
            <div
              class="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300 ease-out"
              :style="{ width: progress + '%' }"
            ></div>
            <span
              class="absolute inset-0 flex items-center justify-center text-white font-semibold"
            >
              {{ progress }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div
      class="max-w-7xl mx-auto grid grid-cols-12 gap-6 h-[calc(100vh-16rem)]"
    >
      <!-- Left sidebar: Playlists list -->
      <div
        class="col-span-3 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col"
      >
        <div class="p-4 border-b border-slate-700">
          <h2 class="text-xl font-bold text-white">Playlists</h2>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div
            v-if="error"
            class="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-400 text-sm"
          >
            Error: {{ (error as any).message || error }}
          </div>

          <div v-else-if="pending" class="text-center py-8 text-slate-400">
            <UIcon
              name="i-lucide-loader-2"
              class="animate-spin text-2xl mb-2"
            />
            <p>Loading...</p>
          </div>

          <div v-else class="space-y-2">
            <div
              v-for="pl in playlists"
              :key="pl.id"
              @click="selectPlaylist(pl)"
              :class="[
                'flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-all',
                selectedPlaylist?.id === pl.id
                  ? 'bg-primary-500/20 border-2 border-primary-500'
                  : 'bg-slate-900 border border-slate-700 hover:border-slate-600 hover:bg-slate-900/70',
              ]"
            >
              <img
                v-if="pl.image && pl.image[0]"
                :src="pl.image[0]"
                alt="playlist image"
                class="w-14 h-14 rounded-md object-cover"
              />
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-white text-sm truncate">
                  {{ pl.name }}
                </div>
                <div class="text-xs text-slate-400 mt-1">
                  {{ pl.tracksCount }} tracks
                </div>
              </div>
            </div>
            <div
              v-if="!playlists || playlists.length === 0"
              class="text-center py-8 text-slate-400 italic"
            >
              No playlists found.
            </div>
          </div>
        </div>
      </div>

      <!-- Center area: Tracks list -->
      <div
        class="col-span-9 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col"
      >
        <div class="p-4 border-b border-slate-700">
          <h2 class="text-xl font-bold text-white">
            <UIcon name="i-lucide-music-2" class="inline-block mr-2" />
            Tracks
            <span
              v-if="selectedPlaylist"
              class="text-slate-400 text-base font-normal ml-2"
            >
              - {{ selectedPlaylist.name }}
            </span>
          </h2>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div
            v-if="!selectedPlaylist"
            class="text-center py-20 text-slate-400"
          >
            <UIcon
              name="i-lucide-mouse-pointer-click"
              class="text-6xl mb-4 opacity-50"
            />
            <p class="text-lg">Select a playlist to view tracks</p>
          </div>

          <div
            v-else-if="loadingTracks"
            class="text-center py-20 text-slate-400"
          >
            <UIcon
              name="i-lucide-loader-2"
              class="animate-spin text-4xl mb-4"
            />
            <p>Loading tracks...</p>
          </div>

          <div v-else>
            <div
              v-if="tracks.length === 0"
              class="bg-blue-500/10 border border-blue-500 rounded-lg p-6"
            >
              <p class="text-blue-400 mb-3 font-semibold">
                <UIcon name="i-lucide-info" class="inline-block mr-2" />
                Displaying tracks requires implementing the API endpoint:
              </p>
              <code
                class="block bg-slate-900 px-4 py-2 rounded text-slate-300 font-mono text-sm"
              >
                /api/spotify/playlists/:id/tracks
              </code>
            </div>

            <div class="space-y-1">
              <div
                v-for="(track, index) in tracks"
                :key="track.id"
                class="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-900/50 transition-colors group"
              >
                <div class="w-8 text-center text-slate-400 text-sm font-medium">
                  {{ index + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <div
                    class="font-medium text-white truncate group-hover:text-primary-400 transition-colors"
                  >
                    {{ track.name }}
                  </div>
                  <div class="text-sm text-slate-400 truncate mt-0.5">
                    {{ track.artists?.map((a) => a.name).join(", ") }}
                  </div>
                </div>
                <div class="text-sm text-slate-500 max-w-[200px] truncate">
                  {{ track.album?.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

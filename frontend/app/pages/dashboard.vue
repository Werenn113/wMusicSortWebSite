<script setup lang="ts">
const authStore = useAuthStore()

const { onClickLogoutButton } = useLogout()
const { onClickSpotifyConnectButton } = useSpotifyLogin()

onMounted(() => {
    authStore.checkSpotifyConnection()
})

definePageMeta({
    middleware: 'auth'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Header Section -->
      <div class="mb-12 space-y-4">
        <h1 class="hero-title">
          Welcome back, <span class="gradient-text">{{ authStore.user?.username }}</span>!
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          Manage your music and discover new playlists with AI-powered recommendations
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Playlists</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-list-music" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Saved Tracks</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-heart" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">AI Insights</p>
              <p class="text-3xl font-bold text-slate-900 dark:text-white mt-2">Ready</p>
            </div>
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-zap" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">Account</p>
              <p class="text-sm font-bold text-slate-900 dark:text-white mt-2">
                <span v-if="authStore.isSpotifyConnected" class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
                  Connected
                </span>
                <span v-else class="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <UIcon name="i-lucide-alert-circle" class="w-4 h-4" />
                  Not Connected
                </span>
              </p>
            </div>
            <div class="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-music" class="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Actions -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <!-- Spotify Connection -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Spotify Connection</h2>
              <p class="text-slate-600 dark:text-slate-400 mt-2">
                {{ authStore.isSpotifyConnected ? 'Your Spotify account is connected' : 'Connect your Spotify to get started' }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-spotify" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div class="space-y-4">
            <div v-if="!authStore.isSpotifyConnected" class="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <p class="text-sm text-orange-900 dark:text-orange-200">
                Connect your Spotify account to access all features and start creating AI-powered playlists.
              </p>
            </div>

            <div v-if="authStore.isSpotifyConnected" class="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <p class="text-sm text-emerald-900 dark:text-emerald-200">
                ✓ Your music is synced and ready to analyze
              </p>
            </div>

            <div class="flex gap-3 pt-2">
              <UButton
                v-if="!authStore.isSpotifyConnected"
                @click="onClickSpotifyConnectButton"
                color="primary"
                size="lg"
                class="btn-transition flex-1"
              >
                <UIcon name="i-lucide-music" />
                Connect Spotify
              </UButton>
              <UButton
                v-else
                to="/spotify/playlists"
                color="primary"
                size="lg"
                class="btn-transition flex-1"
              >
                <UIcon name="i-lucide-list-music" />
                View Playlists
              </UButton>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h2>
              <p class="text-slate-600 dark:text-slate-400 mt-2">
                Manage your profile and preferences
              </p>
            </div>
            <div class="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-settings" class="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
          </div>

          <div class="space-y-4">
            <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
              <p class="text-sm text-slate-600 dark:text-slate-400">
                <span class="font-semibold text-slate-900 dark:text-white">Username:</span> {{ authStore.user?.username }}
              </p>
            </div>

            <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
              <p class="text-sm text-slate-600 dark:text-slate-400">
                <span class="font-semibold text-slate-900 dark:text-white">Email:</span> {{ authStore.user?.email || 'Not provided' }}
              </p>
            </div>

            <div class="pt-2">
              <UButton
                color="error"
                variant="outline"
                @click="onClickLogoutButton"
                class="btn-transition w-full"
              >
                <UIcon name="i-lucide-log-out" />
                Logout
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Getting Started -->
      <div class="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 sm:p-12 text-white">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-4">Get the most out of wMusicSort</h2>
            <p class="text-lg opacity-90 mb-6">
              Follow these simple steps to unlock all features and start creating amazing playlists with AI assistance.
            </p>
            <ol class="space-y-3">
              <li class="flex items-start gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full flex-shrink-0">1</span>
                <span>Connect your Spotify account</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full flex-shrink-0">2</span>
                <span>Explore your music library</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full flex-shrink-0">3</span>
                <span>Let AI create perfect playlists</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full flex-shrink-0">4</span>
                <span>Share with friends and enjoy</span>
              </li>
            </ol>
          </div>

          <div class="hidden md:block">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-8 space-y-4">
              <div class="h-24 bg-white/10 rounded-lg"></div>
              <div class="h-24 bg-white/10 rounded-lg"></div>
              <div class="h-24 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

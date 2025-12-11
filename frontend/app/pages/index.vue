<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
  >
    <!-- Hero Section -->
    <section class="section-py section-px">
      <div class="max-w-5xl mx-auto">
        <!-- Main headline -->
        <div class="text-center mb-8 space-y-6">
          <h1 class="hero-title">
            <span class="gradient-text">Sort Your Music</span><br />
            With AI Power
          </h1>
          <p class="hero-subtitle">
            The ultimate platform to organize, analyze, and create the perfect
            playlists using cutting-edge AI technology. Discover new music
            patterns and unlock your listening potential.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <UButton
            v-if="!authStore.isAuthenticated"
            to="/auth/register"
            size="lg"
            color="primary"
            class="btn-transition px-8"
          >
            Get Started Free
            <template #trailing>
              <UIcon name="i-lucide-arrow-right" />
            </template>
          </UButton>
          <UButton
            v-else
            to="/dashboard"
            size="lg"
            color="primary"
            class="btn-transition px-8"
          >
            Go to Dashboard
            <template #trailing>
              <UIcon name="i-lucide-arrow-right" />
            </template>
          </UButton>
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            class="btn-transition"
          >
            Watch Demo
            <template #trailing>
              <UIcon name="i-lucide-play" />
            </template>
          </UButton>
        </div>

        <!-- Trust indicators -->
        <div
          class="text-center text-sm text-slate-600 dark:text-slate-400 space-y-2"
        >
          <p>✨ Free account · No credit card needed · Instant results</p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-py section-px bg-slate-100/50 dark:bg-slate-800/30">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <h2
            class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white"
          >
            Why wMusicSort?
          </h2>
          <p
            class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Discover why thousands of music enthusiasts trust us to organize
            their collections
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="card-hover bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-zap"
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            >
              AI-Powered Sorting
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Automatic organization of your music by genre, mood, tempo, and
              more using advanced AI algorithms.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="card-hover bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-list-music"
                class="w-6 h-6 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            >
              Smart Playlists
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Create perfectly curated playlists that match your mood and taste
              with intelligent recommendations.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="card-hover bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-music"
                class="w-6 h-6 text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            >
              Music Analytics
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Deep insights into your listening habits, favorite genres, and
              music discovery patterns.
            </p>
          </div>

          <!-- Feature 4 -->
          <div
            class="card-hover bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-users"
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            >
              Social Integration
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Share playlists with friends and discover what others are
              listening to in real-time.
            </p>
          </div>

          <!-- Feature 5 -->
          <div
            class="card-hover bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-shield-check"
                class="w-6 h-6 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            >
              Privacy First
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Your music data is completely secure. We never sell or share your
              listening history.
            </p>
          </div>

          <!-- Feature 6 -->
          <div
            class="card-hover bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-cloud-sync"
                class="w-6 h-6 text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            >
              Sync Across Devices
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Your playlists and preferences are synced instantly across all
              your devices.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-py section-px">
      <div
        class="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white text-center"
      >
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Ready to transform your music experience?
        </h2>
        <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of users who've already discovered a better way to
          organize and enjoy their music.
        </p>
        <UButton
          v-if="!authStore.isAuthenticated"
          to="/auth/register"
          size="lg"
          color="primary"
          variant="outline"
          class="btn-transition"
        >
          Start Your Free Journey
        </UButton>
        <UButton
          v-else
          to="/dashboard"
          size="lg"
          color="primary"
          variant="outline"
          class="btn-transition"
        >
          Back to Dashboard
        </UButton>
      </div>
    </section>
  </div>
</template>

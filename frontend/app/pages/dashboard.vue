<script setup lang="ts">
const authStore = useAuthStore();

const { onClickLogoutButton } = useLogout();
const { onClickSpotifyConnectButton } = useSpotifyLogin();

onMounted(() => {
  authStore.checkSpotifyConnection();
});

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
    <div class="">
      <!-- Header Section -->
      <div class="">
        <h1 class="">
          Welcome back,
          <span class="">{{ authStore.user?.username }}</span
          >!
        </h1>
        <p class="">
          Manage your music and discover new playlists with AI-powered
          recommendations
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="">
        <div class="">
          <div class="">
            <div>
              <p class="">Total Playlists</p>
              <p class="">0</p>
            </div>
            <div class="">
              <UIcon name="i-lucide-list-music" class="" />
            </div>
          </div>
        </div>

        <div class="">
          <div class="">
            <div>
              <p class="">Saved Tracks</p>
              <p class="">0</p>
            </div>
            <div class="">
              <UIcon name="i-lucide-heart" class="" />
            </div>
          </div>
        </div>

        <div class="">
          <div class="">
            <div>
              <p class="">AI Insights</p>
              <p class="">Ready</p>
            </div>
            <div class="">
              <UIcon name="i-lucide-zap" class="" />
            </div>
          </div>
        </div>

        <div class="">
          <div class="">
            <div>
              <p class="">Account</p>
              <p class="">
                <span v-if="authStore.isSpotifyConnected" class="">
                  <UIcon name="i-lucide-check-circle" class="" />
                  Connected
                </span>
                <span v-else class="">
                  <UIcon name="i-lucide-alert-circle" class="" />
                  Not Connected
                </span>
              </p>
            </div>
            <div class="">
              <UIcon name="i-lucide-music" class="" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Actions -->
      <div class="">
        <!-- Spotify Connection -->
        <div class="">
          <div class="">
            <div>
              <h2 class="">Spotify Connection</h2>
              <p class="">
                {{
                  authStore.isSpotifyConnected
                    ? "Your Spotify account is connected"
                    : "Connect your Spotify to get started"
                }}
              </p>
            </div>
            <div class="">
              <UIcon name="i-lucide-spotify" class="" />
            </div>
          </div>

          <div class="">
            <div v-if="!authStore.isSpotifyConnected" class="">
              <p class="">
                Connect your Spotify account to access all features and start
                creating AI-powered playlists.
              </p>
            </div>

            <div v-if="authStore.isSpotifyConnected" class="">
              <p class="">✓ Your music is synced and ready to analyze</p>
            </div>

            <div class="">
              <UButton
                v-if="!authStore.isSpotifyConnected"
                @click="onClickSpotifyConnectButton"
                color="primary"
                size="lg"
                class=""
              >
                <UIcon name="i-lucide-music" />
                Connect Spotify
              </UButton>
              <UButton
                v-else
                to="/spotify/playlists"
                color="primary"
                size="lg"
                class=""
              >
                <UIcon name="i-lucide-list-music" />
                View Playlists
              </UButton>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="">
          <div class="">
            <div>
              <h2 class="">Account Settings</h2>
              <p class="">Manage your profile and preferences</p>
            </div>
            <div class="">
              <UIcon name="i-lucide-settings" class="" />
            </div>
          </div>

          <div class="">
            <div class="">
              <p class="">
                <span class="">Username:</span>
                {{ authStore.user?.username }}
              </p>
            </div>

            <div class="">
              <p class="">
                <span class="">Email:</span>
                {{ authStore.user?.email || "Not provided" }}
              </p>
            </div>

            <div class="">
              <UButton
                color="error"
                variant="outline"
                @click="onClickLogoutButton"
                class=""
              >
                <UIcon name="i-lucide-log-out" />
                Logout
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Getting Started -->
      <div class="">
        <div class="">
          <div>
            <h2 class="">Get the most out of wMusicSort</h2>
            <p class="">
              Follow these simple steps to unlock all features and start
              creating amazing playlists with AI assistance.
            </p>
            <ol class="">
              <li class="">
                <span class="">1</span>
                <span>Connect your Spotify account</span>
              </li>
              <li class="">
                <span class="">2</span>
                <span>Explore your music library</span>
              </li>
              <li class="">
                <span class="">3</span>
                <span>Let AI create perfect playlists</span>
              </li>
              <li class="">
                <span class="">4</span>
                <span>Share with friends and enjoy</span>
              </li>
            </ol>
          </div>

          <div class="">
            <div class="">
              <div class=""></div>
              <div class=""></div>
              <div class=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

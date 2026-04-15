<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { useDarkMode } from "../composables/useDarkMode";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const cart = useCartStore();
const { isDark, toggle } = useDarkMode();

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Vehicles", to: "/vehicles" },
];

function handleLogout() {
  auth.logout();
  router.push("/");
}

const isActive = (path: string) => route.path === path;
</script>

<template>
  <header
    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm"
  >
    <div
      class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 flex-shrink-0">
        <div
          class="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
            />
          </svg>
        </div>
        <div class="hidden sm:block">
          <span
            class="text-lg font-black text-blue-800 dark:text-blue-400 tracking-tighter"
            >JANA</span
          >
          <span
            class="text-lg font-black text-gray-800 dark:text-white tracking-tighter"
          >
            DRIVESELECT</span
          >
        </div>
      </RouterLink>

      <!-- Nav Links -->
      <nav class="hidden md:flex items-center gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          :class="
            isActive(link.to)
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          "
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <!-- Right Controls -->
      <div class="flex items-center gap-2">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggle"
          class="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <svg
            v-if="isDark"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06a.996.996 0 000 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 000-1.41-.996.996 0 00-1.41 0zM7.05 18.36l-1.06 1.06a.996.996 0 000 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 000-1.41-.96.96 0 00-1.41 0z"
            />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 3a9 9 0 100 18A9 9 0 0012 3zm0 0c-1.3 0-2.53.27-3.65.75C10.53 5.13 12 7.4 12 10c0 2.6-1.47 4.87-3.65 6.25C9.47 16.73 10.7 17 12 17a7 7 0 000-14z"
            />
          </svg>
        </button>

        <!-- Cart -->
        <RouterLink
          to="/cart"
          class="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cart.totalItems > 9 ? "9+" : cart.totalItems }}
          </span>
        </RouterLink>

        <!-- Auth -->
        <template v-if="auth.isLoggedIn">
          <div class="flex items-center gap-2">
            <img
              v-if="auth.user?.image"
              :src="auth.user.image"
              :alt="auth.displayName"
              class="w-8 h-8 rounded-full object-cover hidden sm:block"
            />
            <span
              class="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block"
            >
              {{ auth.user?.firstName }}
            </span>
            <button
              @click="handleLogout"
              class="text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-400 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </RouterLink>
        </template>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div class="md:hidden flex gap-1 px-4 pb-3">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        :class="
          isActive(link.to)
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        "
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </header>
</template>

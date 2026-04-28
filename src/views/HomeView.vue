<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Vehicle, VehicleResponse } from '../types/Vehicle'
import VehicleCard from '../components/VehicleCard.vue'

const router = useRouter()
const featured = ref<Vehicle[]>([])
const isLoading = ref(true)

async function fetchFeatured() {
  try {
    const res = await fetch('https://dummyjson.com/products/category/vehicle?limit=4')
    const data: VehicleResponse = await res.json()
    featured.value = data.products.slice(0, 4)
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchFeatured)
</script>

<template>
  <!-- Hero -->
  <section class="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Welcome to Jana DriveSelect</p>
      <h1 class="text-4xl sm:text-5xl font-black leading-tight mb-5">
        Find Your Perfect <span class="text-blue-400">Vehicle</span>
      </h1>
      <p class="text-gray-300 text-lg max-w-xl mx-auto mb-8">
        Browse our curated selection of premium cars and motorcycles with real-time filtering and easy checkout.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          @click="router.push('/vehicles')"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Browse All Vehicles
        </button>
        <button
          @click="router.push('/login')"
          class="border border-gray-500 hover:border-white text-gray-300 hover:text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  </section>

  <!-- Stats Bar -->
  <section class="bg-blue-700 text-white py-5 px-4">
    <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      <div><div class="text-2xl font-black">50+</div><div class="text-blue-200 text-sm">Vehicles</div></div>
      <div><div class="text-2xl font-black">15+</div><div class="text-blue-200 text-sm">Brands</div></div>
      <div><div class="text-2xl font-black">4.5★</div><div class="text-blue-200 text-sm">Avg Rating</div></div>
      <div><div class="text-2xl font-black">Free</div><div class="text-blue-200 text-sm">Shipping</div></div>
    </div>
  </section>

  <!-- Featured -->
  <section class="max-w-7xl mx-auto px-4 py-14">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-black text-gray-900 dark:text-white">Featured Cars</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Hand-picked top picks</p>
      </div>
      <button
        @click="router.push('/vehicles')"
        class="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
      >
        View all →
      </button>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 4" :key="i" class="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-video animate-pulse" />
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <VehicleCard v-for="v in featured" :key="v.id" :vehicle="v" />
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-gray-50 dark:bg-gray-800/50 py-14 px-4">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-3">Ready to ride?</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-6">Browse our full inventory of cars and motorcycles from top brands.</p>
      <button
        @click="router.push('/vehicles')"
        class="bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-100 transition-colors"
      >
        Explore All Vehicles
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Vehicle } from '../types/Vehicle'
import { useCartStore } from '../stores/useCartStore'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const vehicle = ref<Vehicle | null>(null)
const isLoading = ref(true)
const selectedImage = ref(0)
const error = ref(false)

const inCart = computed(() => vehicle.value ? cart.isInCart(vehicle.value.id) : false)

function getTransmission(id: number): 'Automatic' | 'Manual' {
  return id % 2 === 0 ? 'Automatic' : 'Manual'
}

async function fetchVehicle() {
  const id = route.params.id
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) throw new Error('Not found')
    vehicle.value = await res.json()
  } catch {
    error.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchVehicle)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">

    <!-- Back -->
    <button
      @click="router.back()"
      class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to results
    </button>

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
      <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl" />
      <div class="space-y-4">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-6" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-24">
      <div class="text-5xl mb-4">😕</div>
      <p class="text-xl font-semibold text-gray-700 dark:text-gray-300">Vehicle not found</p>
      <button @click="router.push('/vehicles')" class="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
        Browse all vehicles
      </button>
    </div>

    <!-- Detail Content -->
    <div v-else-if="vehicle" class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- Images -->
      <div class="space-y-3">
        <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
          <img
            :src="vehicle.images?.[selectedImage] || vehicle.thumbnail"
            :alt="vehicle.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-if="vehicle.images?.length > 1" class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="(img, i) in vehicle.images"
            :key="i"
            @click="selectedImage = i"
            class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
            :class="selectedImage === i ? 'border-blue-500' : 'border-transparent'"
          >
            <img :src="img" :alt="`Image ${i+1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="space-y-5">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {{ vehicle.brand }} · {{ vehicle.category === 'vehicle' ? 'Car' : 'Motorcycle' }}
          </span>
          <h1 class="text-3xl font-black text-gray-900 dark:text-white mt-1">{{ vehicle.title }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mt-2">
            <div class="flex">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(vehicle.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ vehicle.rating.toFixed(1) }} · {{ vehicle.reviews?.length || 0 }} reviews
            </span>
          </div>
        </div>

        <!-- Price -->
        <div class="flex items-end gap-3">
          <span class="text-4xl font-black text-blue-700 dark:text-blue-400">
            ${{ (vehicle.price * (1 - vehicle.discountPercentage / 100)).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
          </span>
          <div v-if="vehicle.discountPercentage > 1" class="mb-1">
            <span class="text-lg text-gray-400 line-through">${{ vehicle.price.toLocaleString() }}</span>
            <span class="ml-2 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">
              -{{ Math.round(vehicle.discountPercentage) }}%
            </span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ vehicle.description }}</p>

        <!-- Specs Grid -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Transmission</div>
            <div class="font-semibold text-gray-900 dark:text-white mt-0.5">{{ getTransmission(vehicle.id) }}</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Stock</div>
            <div class="font-semibold text-gray-900 dark:text-white mt-0.5">{{ vehicle.stock }} units</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Availability</div>
            <div class="font-semibold text-green-600 dark:text-green-400 mt-0.5">{{ vehicle.availabilityStatus }}</div>
          </div>
          <div v-if="vehicle.warrantyInformation" class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Warranty</div>
            <div class="font-semibold text-gray-900 dark:text-white mt-0.5 text-sm">{{ vehicle.warrantyInformation }}</div>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="vehicle.tags?.length" class="flex flex-wrap gap-2">
          <span
            v-for="tag in vehicle.tags"
            :key="tag"
            class="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium px-3 py-1 rounded-full capitalize"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Cart Button -->
        <button
          @click="vehicle && cart.addItem(vehicle)"
          class="w-full py-4 rounded-xl text-base font-bold transition-all duration-200"
          :class="inCart
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            : 'bg-blue-700 hover:bg-blue-800 text-white'"
        >
          {{ inCart ? '✓ Added to Cart' : 'Add to Cart' }}
        </button>

        <button
          v-if="inCart"
          @click="router.push('/cart')"
          class="w-full py-3 rounded-xl text-base font-bold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          View Cart →
        </button>

      </div>
    </div>

    <!-- Reviews -->
    <div v-if="vehicle?.reviews?.length" class="mt-14">
      <h2 class="text-xl font-black text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="review in vehicle.reviews"
          :key="review.reviewerName"
          class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 space-y-2"
        >
          <div class="flex items-center justify-between">
            <span class="font-semibold text-sm text-gray-900 dark:text-white">{{ review.reviewerName }}</span>
            <div class="flex">
              <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
          <p class="text-xs text-gray-400">{{ new Date(review.date).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

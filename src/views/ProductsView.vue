<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Vehicle, VehicleResponse } from '../types/Vehicle'
import VehicleCard from '../components/VehicleCard.vue'
import FilterBar from '../components/FilterBar.vue'

const allVehicles = ref<Vehicle[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const selectedBrand = ref('All')
const selectedCategory = ref('All')
const selectedTransmission = ref('All')
const minPrice = ref(0)
const maxPrice = ref(0)

function getTransmission(id: number): 'Automatic' | 'Manual' {
  return id % 2 === 0 ? 'Automatic' : 'Manual'
}

async function fetchAllVehicles() {
  try {
    const [carsRes, bikesRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/vehicle'),
      fetch('https://dummyjson.com/products/category/motorcycle'),
    ])
    const carData: VehicleResponse = await carsRes.json()
    const bikeData: VehicleResponse = await bikesRes.json()
    allVehicles.value = [...carData.products, ...bikeData.products]
  } catch (error) {
    console.error('Failed to load vehicles:', error)
  } finally {
    isLoading.value = false
  }
}

const filteredVehicles = computed(() =>
  allVehicles.value.filter((vehicle) => {
    const matchesSearch =
      vehicle.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesBrand = selectedBrand.value === 'All' || vehicle.brand === selectedBrand.value
    const matchesCategory = selectedCategory.value === 'All' || vehicle.category === selectedCategory.value
    const transmission = getTransmission(vehicle.id)
    const matchesTransmission = selectedTransmission.value === 'All' || transmission === selectedTransmission.value
    const matchesMin = !minPrice.value || vehicle.price >= minPrice.value
    const matchesMax = !maxPrice.value || vehicle.price <= maxPrice.value
    return matchesSearch && matchesBrand && matchesCategory && matchesTransmission && matchesMin && matchesMax
  })
)

function resetFilters() {
  searchQuery.value = ''
  selectedBrand.value = 'All'
  selectedCategory.value = 'All'
  selectedTransmission.value = 'All'
  minPrice.value = 0
  maxPrice.value = 0
}

onMounted(fetchAllVehicles)
</script>

<template>
  <FilterBar
    :vehicles="allVehicles"
    v-model:searchQuery="searchQuery"
    v-model:selectedBrand="selectedBrand"
    v-model:selectedCategory="selectedCategory"
    v-model:selectedTransmission="selectedTransmission"
    v-model:minPrice="minPrice"
    v-model:maxPrice="maxPrice"
    @reset="resetFilters"
  />

  <main class="max-w-7xl mx-auto px-4 py-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-black text-gray-900 dark:text-white">All Vehicles</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {{ isLoading ? 'Loading...' : `${filteredVehicles.length} results` }}
        </p>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse"
      >
        <div class="aspect-video bg-gray-200 dark:bg-gray-700" />
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-4" />
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="filteredVehicles.length === 0" class="text-center py-24">
      <div class="text-5xl mb-4">🔍</div>
      <p class="text-xl font-semibold text-gray-700 dark:text-gray-300">No vehicles found</p>
      <p class="text-sm text-gray-400 mt-1 mb-6">Try adjusting your search or filters</p>
      <button
        @click="resetFilters"
        class="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
      >
        Clear all filters
      </button>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <VehicleCard
        v-for="item in filteredVehicles"
        :key="item.id"
        :vehicle="item"
      />
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Vehicle, VehicleResponse } from './types/Vehicle'
import VehicleCard from './components/VehicleCard.vue'
import FilterBar from './components/FilterBar.vue'

// --- State ---
const allVehicles = ref<Vehicle[]>([])
const isLoading = ref(true)

// Filter state
const searchQuery = ref('')
const selectedBrand = ref('All')
const selectedCategory = ref('All')
const selectedTransmission = ref('All')
const minPrice = ref(0)
const maxPrice = ref(0)

// --- Transmission helper ---
function getTransmission(id: number): 'Automatic' | 'Manual' {
  return id % 2 === 0 ? 'Automatic' : 'Manual'
}

// --- Fetch ---
const fetchAllVehicles = async () => {
  try {
    const [carsRes, bikesRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/vehicle'),
      fetch('https://dummyjson.com/products/category/motorcycle'),
    ])
    const carData: VehicleResponse = await carsRes.json()
    const bikeData: VehicleResponse = await bikesRes.json()
    allVehicles.value = [...carData.products, ...bikeData.products]
  } catch (error) {
    console.error('Failed to load Jana DriveSelect data:', error)
  } finally {
    isLoading.value = false
  }
}

// --- Filtered list (computed) ---
const filteredVehicles = computed(() => {
  return allVehicles.value.filter(vehicle => {

    // Search
    const matchesSearch = vehicle.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Brand
    const matchesBrand = selectedBrand.value === 'All' || vehicle.brand === selectedBrand.value

    // Category
    const matchesCategory = selectedCategory.value === 'All' || vehicle.category === selectedCategory.value

    // Transmission
    const transmission = getTransmission(vehicle.id)
    const matchesTransmission = selectedTransmission.value === 'All' || transmission === selectedTransmission.value

    // Price
    const matchesMin = !minPrice.value || vehicle.price >= minPrice.value
    const matchesMax = !maxPrice.value || vehicle.price <= maxPrice.value

    return matchesSearch && matchesBrand && matchesCategory && matchesTransmission && matchesMin && matchesMax
  })
})

onMounted(fetchAllVehicles)
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-20 p-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h3 class="text-xl font-black text-blue-800 tracking-tighter">JANA <span class="text-gray-900">DRIVESELECT</span></h3>
          <div class="text-xs text-gray-500 font-medium">Items: {{ filteredVehicles.length }}</div>
        </div>
      </div>
    </header>

    <!-- Filter Bar -->
    <FilterBar
      :vehicles="allVehicles"
      v-model:searchQuery="searchQuery"
      v-model:selectedBrand="selectedBrand"
      v-model:selectedCategory="selectedCategory"
      v-model:selectedTransmission="selectedTransmission"
      v-model:minPrice="minPrice"
      v-model:maxPrice="maxPrice"
    />

    <!-- Main -->
    <main class="max-w-7xl mx-auto p-6">

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>

      <!-- No results -->
      <div v-else-if="filteredVehicles.length === 0" class="text-center py-20 text-gray-400">
        <p class="text-xl font-semibold">No vehicles found</p>
        <p class="text-sm mt-1">Try adjusting your filters</p>
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
  </div>
</template>

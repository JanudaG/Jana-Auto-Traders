<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Vehicle, VehicleResponse } from './types/Vehicle';
import VehicleCard from './components/VehicleCard.vue'; // Importing our new component [cite: 17]

// State management for our vehicles [cite: 10]
const allVehicles = ref<Vehicle[]>([]);
const isLoading = ref(true);

const fetchAllVehicles = async () => {
  try {
    // Fetching from both categories as you requested [cite: 20]
    const [carRes, bikeRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/vehicle'),
      fetch('https://dummyjson.com/products/category/motorcycle')
    ]);

    const carData: VehicleResponse = await carRes.json();
    const bikeData: VehicleResponse = await bikeRes.json();

    // Merging the results into one array [cite: 55]
    allVehicles.value = [...carData.products, ...bikeData.products];
  } catch (error) {
    console.error("Failed to load Jana DriveSelect data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAllVehicles);
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-white border-b sticky top-0 z-10 p-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-black text-blue-800 tracking-tighter">JANA <span class="text-gray-900">DRIVESELECT</span></h1>
        <div class="text-sm text-gray-500 font-medium">Items: {{ allVehicles.length }}</div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-6">
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VehicleCard 
          v-for="item in allVehicles" 
          :key="item.id" 
          :vehicle="item" 
        />
      </div>
    </main>
  </div>
</template>

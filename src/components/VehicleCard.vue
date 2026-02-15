<script setup lang="ts">
import type { Vehicle } from "../types/Vehicle";

defineProps<{
  vehicle: Vehicle;
}>();
</script>

<template>
  <div
    class="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
  >
    <div class="relative aspect-video overflow-hidden bg-gray-200">
      <img
        :src="vehicle.thumbnail"
        :alt="vehicle.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        class="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded"
      >
        {{ vehicle.brand }}
      </div>
    </div>

    <div class="p-4 flex-grow flex flex-col">
      <h3 class="text-lg font-bold text-gray-800 line-clamp-1">
        {{ vehicle.title }}
      </h3>
      <p class="text-sm text-gray-500 mt-1 line-clamp-2 flex-grow">
        {{ vehicle.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <span class="text-2xl font-black text-blue-700"
          >${{ vehicle.price.toLocaleString() }}</span
        >
        <button
          class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

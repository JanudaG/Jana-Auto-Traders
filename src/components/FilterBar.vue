<script setup lang="ts">
import { computed } from 'vue'
import type { Vehicle } from '../types/Vehicle'

const props = defineProps<{
  vehicles: Vehicle[]        // full list to extract filter options
  searchQuery: string
  selectedBrand: string
  selectedCategory: string
  selectedTransmission: string
  minPrice: number 
  maxPrice: number
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedBrand', value: string): void
  (e: 'update:selectedCategory', value: string): void
  (e: 'update:selectedTransmission', value: string): void
  (e: 'update:minPrice', value: number): void
  (e: 'update:maxPrice', value: number): void
}>()

// Extract unique brands from the vehicle list dynamically
const brands = computed(() => {
  const unique = new Set(props.vehicles.map(v => v.brand))
  return ['All', ...Array.from(unique).sort()]
})
</script>

<template>
  <div class="bg-white border-b border-gray-200 px-4 py-4 sticky top-16 z-10 shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col gap-4">

      <!-- Search -->
      <input
        type="text"
        placeholder="Search vehicles..."
        :value="searchQuery"
        @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div class="flex flex-wrap gap-3">

        <!-- Brand Filter -->
        <select
          :value="selectedBrand"
          @change="emit('update:selectedBrand', ($event.target as HTMLSelectElement).value)"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="brand in brands" :key="brand" :value="brand">
            {{ brand === 'All' ? 'All Brands' : brand }}
          </option>
        </select>

        <!-- Category Filter -->
        <select
          :value="selectedCategory"
          @change="emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Types</option>
          <option value="vehicle">Cars</option>
          <option value="motorcycle">Motorcycles</option>
        </select>

        <!-- Transmission Filter -->
        <select
          :value="selectedTransmission"
          @change="emit('update:selectedTransmission', ($event.target as HTMLSelectElement).value)"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        <!-- Price Range -->
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>Price:</span>
          <input
            type="number"
            placeholder="Min"
            :value="minPrice || ''"
            @input="emit('update:minPrice', Number(($event.target as HTMLInputElement).value))"
            class="w-24 border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>—</span>
          <input
            type="number"
            placeholder="Max"
            :value="maxPrice || ''"
            @input="emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
            class="w-24 border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>
    </div>
  </div>
</template>
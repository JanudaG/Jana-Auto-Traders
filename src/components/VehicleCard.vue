<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { Vehicle } from "../types/Vehicle";
import { useCartStore } from "../stores/useCartStore";

const props = defineProps<{ vehicle: Vehicle }>();
const router = useRouter();
const cart = useCartStore();

const inCart = computed(() => cart.isInCart(props.vehicle.id));

function getTransmission(id: number): "Automatic" | "Manual" {
  return id % 2 === 0 ? "Automatic" : "Manual";
}

const transmission = computed(() => getTransmission(props.vehicle.id));

const discountedPrice = computed(
  () => props.vehicle.price * (1 - props.vehicle.discountPercentage / 100),
);
</script>

<template>
  <div
    class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col cursor-pointer"
    @click="router.push(`/vehicles/${vehicle.id}`)"
  >
    <!-- Image -->
    <div
      class="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700"
    >
      <img
        :src="vehicle.thumbnail"
        :alt="vehicle.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div
        class="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md"
      >
        {{ vehicle.brand }}
      </div>
      <div
        v-if="vehicle.discountPercentage > 5"
        class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md"
      >
        -{{ Math.round(vehicle.discountPercentage) }}%
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 flex-grow flex flex-col gap-2">
      <h3
        class="text-base font-bold text-gray-900 dark:text-white line-clamp-1"
      >
        {{ vehicle.title }}
      </h3>

      <!-- Tags -->
      <div
        class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
      >
        <span
          class="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded capitalize"
        >
          {{ vehicle.category === "vehicle" ? "Car" : "Motorcycle" }}
        </span>
        <span class="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
          {{ transmission }}
        </span>
        <span class="flex items-center gap-0.5">
          <svg
            class="w-3.5 h-3.5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
          {{ vehicle.rating.toFixed(1) }}
        </span>
      </div>

      <!-- Price -->
      <div class="mt-auto pt-2 flex items-end justify-between">
        <div>
          <div class="text-xl font-black text-blue-700 dark:text-blue-400">
            ${{
              discountedPrice.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })
            }}
          </div>
          <div
            v-if="vehicle.discountPercentage > 5"
            class="text-xs text-gray-400 line-through"
          >
            ${{ vehicle.price.toLocaleString() }}
          </div>
        </div>

        <button
          @click.stop="cart.addItem(vehicle)"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          :class="
            inCart
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-blue-600 dark:hover:bg-blue-600'
          "
        >
          <svg
            v-if="inCart"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <svg
            v-else
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          {{ inCart ? "Added" : "Add" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import { useAuthStore } from '../stores/useAuthStore'

const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()

const savings = computed(() =>
  cart.items.reduce((sum, item) => {
    const saved = item.vehicle.price * (item.vehicle.discountPercentage / 100)
    return sum + saved * item.quantity
  }, 0)
)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-black text-gray-900 dark:text-white mb-8">
      Shopping Cart
      <span v-if="cart.totalItems" class="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">
        ({{ cart.totalItems }} {{ cart.totalItems === 1 ? 'item' : 'items' }})
      </span>
    </h1>

    <!-- Empty -->
    <div v-if="cart.items.length === 0" class="text-center py-24">
      <div class="text-6xl mb-4">🛒</div>
      <p class="text-xl font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</p>
      <p class="text-sm text-gray-400 mt-1 mb-6">Start browsing to add vehicles</p>
      <button
        @click="router.push('/vehicles')"
        class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-colors"
      >
        Browse Vehicles
      </button>
    </div>

    <!-- Cart Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Items List -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.vehicle.id"
          class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex gap-4"
        >
          <!-- Image -->
          <img
            :src="item.vehicle.thumbnail"
            :alt="item.vehicle.title"
            class="w-24 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            @click="router.push(`/vehicles/${item.vehicle.id}`)"
          />

          <!-- Details -->
          <div class="flex-grow min-w-0 space-y-1">
            <h3
              class="font-bold text-gray-900 dark:text-white truncate cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              @click="router.push(`/vehicles/${item.vehicle.id}`)"
            >
              {{ item.vehicle.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.vehicle.brand }}</p>
            <p class="text-lg font-black text-blue-700 dark:text-blue-400">
              ${{ (item.vehicle.price * (1 - item.vehicle.discountPercentage / 100)).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
            </p>
          </div>

          <!-- Quantity + Remove -->
          <div class="flex flex-col items-end justify-between flex-shrink-0">
            <button
              @click="cart.removeItem(item.vehicle.id)"
              class="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div class="flex items-center gap-2 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                @click="cart.updateQuantity(item.vehicle.id, item.quantity - 1)"
                class="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
              >−</button>
              <span class="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                {{ item.quantity }}
              </span>
              <button
                @click="cart.updateQuantity(item.vehicle.id, item.quantity + 1)"
                class="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
              >+</button>
            </div>
          </div>
        </div>

        <!-- Clear Cart -->
        <button
          @click="cart.clearCart()"
          class="text-sm text-red-500 dark:text-red-400 hover:underline font-medium"
        >
          ✕ Clear entire cart
        </button>
      </div>

      <!-- Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 space-y-4 sticky top-24">
          <h2 class="font-black text-lg text-gray-900 dark:text-white">Order Summary</h2>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${{ cart.totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}</span>
            </div>
            <div v-if="savings > 0" class="flex justify-between text-green-600 dark:text-green-400 font-medium">
              <span>You Save</span>
              <span>-${{ savings.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span class="text-green-600 font-medium">Free</span>
            </div>
          </div>

          <div class="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-center">
            <span class="font-black text-gray-900 dark:text-white">Total</span>
            <span class="text-2xl font-black text-blue-700 dark:text-blue-400">
              ${{ cart.totalPrice.toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
            </span>
          </div>

          <button
            v-if="auth.isLoggedIn"
            class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Checkout
          </button>
          <div v-else class="space-y-2">
            <button
              @click="router.push('/login')"
              class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Login to Checkout
            </button>
            <p class="text-xs text-center text-gray-400">You must be logged in to proceed</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

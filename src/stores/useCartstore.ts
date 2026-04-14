import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Vehicle } from '../types/Vehicle'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem('cart_items') || '[]')
  )

  function persist() {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.vehicle.price * item.quantity, 0)
  )

  function addItem(vehicle: Vehicle) {
    const existing = items.value.find((i) => i.vehicle.id === vehicle.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ vehicle, quantity: 1 })
    }
    persist()
  }

  function removeItem(vehicleId: number) {
    items.value = items.value.filter((i) => i.vehicle.id !== vehicleId)
    persist()
  }

  function updateQuantity(vehicleId: number, quantity: number) {
    const item = items.value.find((i) => i.vehicle.id === vehicleId)
    if (item) {
      if (quantity <= 0) {
        removeItem(vehicleId)
      } else {
        item.quantity = quantity
        persist()
      }
    }
  }

  function clearCart() {
    items.value = []
    persist()
  }

  function isInCart(vehicleId: number): boolean {
    return items.value.some((i) => i.vehicle.id === vehicleId)
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  }
})

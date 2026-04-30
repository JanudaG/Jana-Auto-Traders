import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/vehicles', name: 'vehicles', component: ProductsView },
    { path: '/vehicles/:id', name: 'vehicle-detail', component: ProductDetailView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/cart', name: 'cart', component: CartView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

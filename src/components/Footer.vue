<template>
  <footer class="bg-gray-900 dark:bg-black text-gray-400 mt-16">
    <div class="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div>
        <h3 class="text-white font-black text-lg tracking-tighter mb-2">JANA <span class="text-blue-400">DRIVESELECT</span></h3>
        <p class="text-sm leading-relaxed">Your trusted online marketplace for premium vehicles and motorcycles.</p>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Quick Links</h4>
        <ul class="space-y-2 text-sm">
          <li><RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink></li>
          <li><RouterLink to="/vehicles" class="hover:text-white transition-colors">Browse Vehicles</RouterLink></li>
          <li><RouterLink to="/cart" class="hover:text-white transition-colors">My Cart</RouterLink></li>
          <li><RouterLink to="/login" class="hover:text-white transition-colors">Login</RouterLink></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">Powered By</h4>
        <p class="text-sm">DummyJSON API</p>
        <p class="text-sm mt-1">Vue 3 + TypeScript + Tailwind CSS</p>
        <p class="text-sm mt-1">Pinia · Vue Router · Vite</p>
      </div>
    </div>
    <div class="border-t border-gray-800 text-center py-4 text-xs text-gray-600">
      © {{ new Date().getFullYear() }} Jana DriveSelect. CS3404 Mini Project.
    </div>
  </footer>
</template>
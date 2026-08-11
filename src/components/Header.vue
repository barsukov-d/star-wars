<script setup lang="ts">
const siteName = 'Star Wars Starships Catalog'
</script>

<template>
  <header class="site-header">
    <div class="brand">
      <svg class="logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <path
          d="M32 4 C42 16 50 28 50 38 C50 46 42 50 32 56 C22 50 14 46 14 38 C14 28 22 16 32 4 Z"
          fill="#bfdbfe"
          stroke="#1e3a8a"
          stroke-width="2"
        />
        <circle cx="32" cy="24" r="6" fill="#f97316" />
        <path d="M20 40 L32 60 L44 40" fill="none" stroke="#1e3a8a" stroke-width="2" />
      </svg>
    </div>
    <nav class="menu" aria-label="Site information">
      <span class="menu-item">{{ siteName }}</span>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #93c5fd;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.logo {
  display: block;
  width: 40px;
  height: 40px;
}
.menu {
  display: flex;
  align-items: center;
}
.menu-item {
  color: #1e3a8a;
  font-size: 1.1rem;
  font-weight: bold;
}
</style>

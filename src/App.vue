<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../utils/supabase'
import type { Tables } from '../database.types.ts'

const instruments = ref<Tables<'instruments'>[]>([])

async function getInstruments() {
  const { data, error } = await supabase.from('instruments').select('id,name')
  if (error) {
    console.error('Error fetching instruments:', error)
  } else {
    instruments.value = data
  }
}

async function checkConnection() {
  try {
    const { data, error } = await supabase.from('instruments').select('id')

    if (error) {
      console.error('❌ Connection Failed:', error.message)
      // Common errors:
      // "401 Unauthorized" = Wrong API Key
      // "PGRST301" = URL is wrong or table name typo
    } else {
      console.log('✅ Connection Successful! Data received:', data)
    }
  } catch (err) {
    console.error('💥 Unexpected Error:', err)
  }
}

onMounted(() => {
  getInstruments()
  checkConnection()
})
</script>

<template>
  <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
  </ul>
</template>
<!-- 
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->

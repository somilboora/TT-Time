<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../utils/supabase'
import type { User } from '@supabase/supabase-js'
import NavBar from '@/components/NavBar.vue'

const user = ref<User | null>(null)

function setupAuthListener() {
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null
    console.log('Auth event:', event)
  })
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
  checkConnection()
  setupAuthListener()
})
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <NavBar :user="user" />
    <main class="w-full">
      <router-view />
    </main>
  </div>
</template>

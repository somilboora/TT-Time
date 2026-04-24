<script setup lang="ts">
import { supabase } from '../../utils/supabase'
import { useRouter } from 'vue-router'
import type { User } from '@supabase/supabase-js'

import { Button } from '@/components/ui/button'

const props = defineProps<{
  user: User | null
}>()

const router = useRouter()

async function handleLogout() {
  await supabase.auth.signOut()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full flex justify-center px-4">
    <div class="flex flex-col w-full max-w-4xl border-b border-x rounded-b-2xl bg-background/95 backdrop-blur shadow-sm">
      <div class="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 gap-3">
        
        <div class="flex items-center justify-between w-full sm:w-auto">
          <router-link :to="{ name: 'leaderboard' }" class="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-80 transition-opacity">
            <span class="text-2xl">🏓</span> TT-Time
          </router-link>
          
          <div class="sm:hidden">
            <Button v-if="!user" size="sm" class="rounded-full shadow-sm font-semibold px-5 cursor-pointer !bg-black !text-white hover:!bg-white hover:!text-green-500 transition-colors duration-300" @click="router.push({ name: 'login' })">
              Login
            </Button>
            <Button v-else variant="outline" size="sm" class="rounded-full shadow-sm font-semibold px-5 cursor-pointer" @click="handleLogout">Logout</Button>
          </div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-1 sm:gap-2">
          <Button size="sm" class="rounded-full shadow-sm font-semibold px-4 sm:px-6 cursor-pointer border border-transparent hover:border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500 transition-colors duration-300" @click="router.push({ name: 'leaderboard' })">
            Leaderboard
          </Button>

          <Button size="sm" class="rounded-full shadow-sm font-semibold px-4 sm:px-6 cursor-pointer border border-transparent hover:border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500 transition-colors duration-300" @click="router.push({ name: 'match-history' })">
            Match History
          </Button>

          <Button v-if="user" size="sm" class="rounded-full shadow-sm font-semibold px-4 sm:px-6 cursor-pointer border border-transparent hover:border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500 transition-colors duration-300" @click="router.push({ name: 'add-match' })">
            Add Match
          </Button>
        </div>

        <div class="hidden sm:flex">
          <Button v-if="!user" size="sm" class="rounded-full shadow-sm font-semibold px-6 cursor-pointer !bg-black !text-white hover:!bg-white hover:!text-green-500 transition-colors duration-300" @click="router.push({ name: 'login' })">
            Login
          </Button>
          <Button v-else variant="outline" size="sm" class="rounded-full shadow-sm font-semibold px-6 cursor-pointer" @click="handleLogout">Logout</Button>
        </div>

      </div>
    </div>
  </header>
</template>

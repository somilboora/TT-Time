<script setup lang="ts">
import { supabase } from '../../utils/supabase'
import { useRouter } from 'vue-router'
import type { User } from '@supabase/supabase-js'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
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
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div class="flex flex-col w-full">
      <div class="flex items-center justify-between px-6 py-4">
        <router-link
          :to="{ name: 'leaderboard' }"
          class="flex items-center gap-2 font-bold text-2xl text-primary"
        >
          <span>🏓</span> TT-Time
        </router-link>

        <div>
          <router-link v-if="!user" :to="{ name: 'login' }">
            <Button variant="outline" size="sm">Login</Button>
          </router-link>
          <Button v-else variant="ghost" size="sm" @click="handleLogout">Logout</Button>
        </div>
      </div>

      <div class="border-t px-6 py-2 bg-muted/30">
        <NavigationMenu>
          <NavigationMenuList class="flex flex-row gap-6 list-none m-0 p-0">
            <NavigationMenuItem>
              <NavigationMenuLink :class="navigationMenuTriggerStyle()" as-child>
                <router-link :to="{ name: 'leaderboard' }">Leaderboard</router-link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem v-if="user">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()" as-child>
                <router-link :to="{ name: 'add-match' }">Add Match</router-link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../utils/supabase'
import type { Tables } from '../../database.types'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const players = ref<Tables<'profiles'>[]>([])

onMounted(async () => {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('elo_rating', { ascending: false })
  players.value = data ?? []
})
</script>

<template>
  <div class="w-full flex justify-center py-10 px-4">
    <div class="w-full max-w-4xl flex flex-col gap-6">
      <h1 class="text-3xl font-bold">Leaderboard</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-1/6">Rank</TableHead>
            <TableHead class="w-3/6">Name</TableHead>
            <TableHead class="w-1/6">Elo</TableHead>
            <TableHead class="w-1/6">Win Streak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="player in players" :key="player.id">
            <TableCell>#{{ players.indexOf(player) + 1 }}</TableCell>
            <TableCell>{{ player.username }}</TableCell>
            <TableCell class="font-medium">{{ player.elo_rating }}</TableCell>
            <TableCell class="text-right">{{ player.win_streak }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../utils/supabase'
import type { Tables } from '@/database.types'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const players = ref<Tables<'players'>[]>([])

onMounted(async () => {
  const { data } = await supabase.from('players').select('*').order('rank', { ascending: true })
  players.value = data ?? []
})
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Leaderboard</h1>
      <router-link to="/login">
        <Button variant="outline">Login to Post Score</Button>
      </router-link>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead class="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="player in players" :key="player.id">
          <TableCell class="font-medium">#{{ player.rank }}</TableCell>
          <TableCell>{{ player.name }}</TableCell>
          <TableCell class="text-right">{{ player.points }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

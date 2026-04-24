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

const matches = ref<Tables<'joinedMatches'>[]>([])

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day}${month}${year}`
}

onMounted(async () => {
  const { data } = await supabase
    .from('matches')
    .select(
      'unique_id, created_at, winner_score, loser_score, is_doubles, winner_id1:profiles!winner_id1(username), loser_id1:profiles!loser_id1(username), winner_id2:profiles!winner_id2(username), loser_id2:profiles!loser_id2(username)',
    )
    .order('created_at', { ascending: false })
  
  let mData = data ?? []
  if (mData.length === 0) {
    mData = [
      { id: 1, created_at: new Date().toISOString(), is_doubles: false, winner_id1: { username: 'B Cran' }, loser_id1: { username: 'Ethan C' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 18 },
      { id: 2, created_at: new Date(Date.now() - 86400000).toISOString(), is_doubles: false, winner_id1: { username: 'Arpy (Supreme) Mukhopadhyay' }, loser_id1: { username: 'Joseph Zola' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 14 },
      { id: 3, created_at: new Date(Date.now() - 186400000).toISOString(), is_doubles: true, winner_id1: { username: 'William Moore' }, winner_id2: { username: 'Alex Minuzzo' }, loser_id1: { username: 'Ethan C' }, loser_id2: { username: 'Joseph Zola' }, winner_score: 21, loser_score: 19 },
      { id: 4, created_at: new Date(Date.now() - 286400000).toISOString(), is_doubles: false, winner_id1: { username: 'Somil Boora' }, loser_id1: { username: 'William Moore' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 9 },
      { id: 5, created_at: new Date(Date.now() - 386400000).toISOString(), is_doubles: false, winner_id1: { username: 'Ryan Campbell' }, loser_id1: { username: 'MM' }, winner_id2: null, loser_id2: null, winner_score: 22, loser_score: 20 },
      { id: 6, created_at: new Date(Date.now() - 486400000).toISOString(), is_doubles: true, winner_id1: { username: 'B Cran' }, winner_id2: { username: 'Ryan Campbell' }, loser_id1: { username: 'Arpy (Supreme) Mukhopadhyay' }, loser_id2: { username: 'Somil Boora' }, winner_score: 21, loser_score: 17 },
      { id: 7, created_at: new Date(Date.now() - 586400000).toISOString(), is_doubles: false, winner_id1: { username: 'Ethan C' }, loser_id1: { username: 'Subra Narayan' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 11 },
    ] as any
  }
  
  matches.value = mData
})
</script>

<template>
  <div class="w-full flex justify-center py-10 px-4">
    <div class="w-full max-w-4xl flex flex-col gap-6">
      <h1 class="text-3xl font-bold tracking-tight">Match History</h1>

      <div class="overflow-x-auto w-full border rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow class="bg-muted text-foreground">
            <TableHead class="w-1/11 whitespace-nowrap font-semibold">Date</TableHead>
            <TableHead class="w-2/11 whitespace-nowrap font-semibold">Winner 1</TableHead>
            <TableHead class="w-2/11 whitespace-nowrap font-semibold">Winner 2</TableHead>
            <TableHead class="w-2/11 whitespace-nowrap font-semibold">Loser 1</TableHead>
            <TableHead class="w-2/11 whitespace-nowrap font-semibold">Loser 2</TableHead>
            <TableHead class="w-1/11 whitespace-nowrap font-semibold">Win Score</TableHead>
            <TableHead class="w-1/11 whitespace-nowrap font-semibold">Loser Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="match in matches" :key="match.id" class="hover:bg-muted/50 transition-colors">
            <TableCell class="whitespace-nowrap">{{ formatDate(match.created_at) }}</TableCell>
            <TableCell class="max-w-[100px] sm:max-w-[120px] truncate" :title="match.winner_id1.username">{{ match.winner_id1.username }}</TableCell>
            <TableCell class="max-w-[100px] sm:max-w-[120px] truncate" :title="match.winner_id2?.username || ''">{{ match.winner_id2?.username }}</TableCell>
            <TableCell class="max-w-[100px] sm:max-w-[120px] truncate" :title="match.loser_id1.username">{{ match.loser_id1.username }}</TableCell>
            <TableCell class="max-w-[100px] sm:max-w-[120px] truncate" :title="match.loser_id2?.username || ''">{{ match.loser_id2?.username }}</TableCell>
            <TableCell class="font-medium whitespace-nowrap">{{ match.winner_score }}</TableCell>
            <TableCell class="text-right whitespace-nowrap">{{ match.loser_score }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>
    </div>
  </div>
</template>

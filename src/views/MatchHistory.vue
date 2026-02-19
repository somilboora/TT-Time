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

onMounted(async () => {
  const { data } = await supabase
    .from('matches')
    .select(
      'unique_id, created_at, winner_score, loser_score, is_doubles, winner_id1:profiles!winner_id1(username), loser_id1:profiles!loser_id1(username), winner_id2:profiles!winner_id2(username), loser_id2:profiles!loser_id2(username)',
    )
    .order('created_at', { ascending: false })
  matches.value = data ?? []
})
</script>

<template>
  <div class="w-full flex justify-center py-10 px-4">
    <div class="w-full max-w-4xl flex flex-col gap-6">
      <h1 class="text-3xl font-bold">Match History</h1>

      <Table>
        <TableHeader>
          <TableRow class="bg-muted">
            <TableHead class="w-1/11">Date</TableHead>
            <TableHead class="w-2/11">Winner 1</TableHead>
            <TableHead class="w-2/11">Winner 2</TableHead>
            <TableHead class="w-2/11">Loser 1</TableHead>
            <TableHead class="w-2/11">Loser 2</TableHead>
            <TableHead class="w-1/11">Win Score</TableHead>
            <TableHead class="w-1/11">Loser Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="match in matches" :key="match.id">
            <TableCell>{{ new Date(match.created_at).toLocaleDateString() }}</TableCell>
            <TableCell>{{ match.winner_id1.username }}</TableCell>
            <TableCell>{{ match.winner_id2?.username }}</TableCell>
            <TableCell>{{ match.loser_id1.username }}</TableCell>
            <TableCell>{{ match.loser_id2?.username }}</TableCell>
            <TableCell class="font-medium">{{ match.winner_score }}</TableCell>
            <TableCell class="text-right">{{ match.loser_score }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

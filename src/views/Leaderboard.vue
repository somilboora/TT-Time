<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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

type ProfileWithStats = Tables<'profiles'> & { games_played: number; win_percentage: string }
const players = ref<ProfileWithStats[]>([])

onMounted(async () => {
  const [profilesRes, matchesRes] = await Promise.all([
    supabase.from('profiles').select('*').order('elo_rating', { ascending: false }),
    supabase.from('matches').select('winner_id1, winner_id2, loser_id1, loser_id2')
  ])

  let profilesData: any[] = profilesRes.data ?? []
  let matchesData: any[] = matchesRes.data ?? []

  if (profilesData.length === 0 && import.meta.env.DEV) {
    const { mockProfilesLeaderboard, mockMatchesLeaderboard } = await import('../../utils/testData')
    profilesData = mockProfilesLeaderboard
    matchesData = mockMatchesLeaderboard
  }

  players.value = profilesData.map(player => {
    let games_played = 0
    let wins = 0

    matchesData.forEach(match => {
      if (match.winner_id1 === player.id || match.winner_id2 === player.id) {
        games_played++
        wins++
      } else if (match.loser_id1 === player.id || match.loser_id2 === player.id) {
        games_played++
      }
    })

    const win_percentage = games_played > 0 ? Math.round((wins / games_played) * 100) + '%' : '0%'

    return { ...player, games_played, win_percentage }
  })
})

const sortKey = ref<string>('elo_rating')
const sortDesc = ref<boolean>(true)

function toggleSort(key: string) {
  if (sortKey.value === key) {
    if (sortDesc.value) {
      sortDesc.value = false
    } else {
      sortKey.value = 'elo_rating'
      sortDesc.value = true
    }
  } else {
    sortKey.value = key
    sortDesc.value = true
  }
}

const sortedPlayers = computed(() => {
  return [...players.value].sort((a, b) => {
    let valA: any = a[sortKey.value as keyof ProfileWithStats]
    let valB: any = b[sortKey.value as keyof ProfileWithStats]
    
    if (sortKey.value === 'win_percentage') {
      valA = parseFloat(valA) || 0
      valB = parseFloat(valB) || 0
    }

    if (valA < valB) return sortDesc.value ? 1 : -1
    if (valA > valB) return sortDesc.value ? -1 : 1
    return 0
  })
})
</script>

<template>
  <div class="w-full flex justify-center py-10 px-4">
    <div class="w-full max-w-4xl flex flex-col gap-6">
      <h1 class="text-3xl font-bold tracking-tight">Leaderboard</h1>

      <div class="overflow-x-auto w-full border rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow class="bg-muted text-foreground">
            <TableHead class="w-1/12 font-semibold whitespace-nowrap">Rank</TableHead>
            <TableHead class="w-4/12 font-semibold whitespace-nowrap">Name</TableHead>
            <TableHead class="w-2/12 font-semibold whitespace-nowrap cursor-pointer hover:text-primary transition-colors select-none" @click="toggleSort('games_played')">
              Games Played <span v-if="sortKey === 'games_played'">{{ sortDesc ? '↓' : '↑' }}</span>
            </TableHead>
            <TableHead class="w-2/12 font-semibold whitespace-nowrap text-right cursor-pointer hover:text-primary transition-colors select-none" @click="toggleSort('win_percentage')">
              Win % <span v-if="sortKey === 'win_percentage'">{{ sortDesc ? '↓' : '↑' }}</span>
            </TableHead>
            <TableHead class="w-2/12 font-semibold whitespace-nowrap text-right cursor-pointer hover:text-primary transition-colors select-none" @click="toggleSort('win_streak')">
              Win Streak <span v-if="sortKey === 'win_streak'">{{ sortDesc ? '↓' : '↑' }}</span>
            </TableHead>
            <TableHead class="w-1/12 font-semibold whitespace-nowrap text-right cursor-pointer hover:text-primary transition-colors select-none" @click="toggleSort('elo_rating')">
              Elo <span v-if="sortKey === 'elo_rating'">{{ sortDesc ? '↓' : '↑' }}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="player in sortedPlayers" :key="player.id" class="hover:bg-muted/50 transition-colors">
            <TableCell>
              #{{ players.indexOf(player) + 1 }}
              <span v-if="players.indexOf(player) === 0" title="Rank #1">🥇</span>
              <span v-else-if="players.indexOf(player) === 1" title="Rank #2">🥈</span>
              <span v-else-if="players.indexOf(player) === 2" title="Rank #3">🥉</span>
            </TableCell>
            <TableCell class="font-medium max-w-[120px] truncate" :title="player.username">{{ player.username }}</TableCell>
            <TableCell class="text-right">{{ player.win_percentage }}</TableCell>
            <TableCell class="text-right">{{ player.win_streak }}</TableCell>
            <TableCell class="text-right font-bold">{{ player.elo_rating }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>
    </div>
  </div>
</template>

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

  let profilesData = profilesRes.data ?? []
  let matchesData = matchesRes.data ?? []

  if (profilesData.length === 0) {
    profilesData = [
      { id: '1', username: 'Ethan C', elo_rating: 1200, win_streak: 3 },
      { id: '2', username: 'Joseph Zola', elo_rating: 1150, win_streak: 2 },
      { id: '3', username: 'Alex Minuzzo', elo_rating: 900, win_streak: 0 },
      { id: '4', username: 'Arpy (Supreme) Mukhopadhyay', elo_rating: 1300, win_streak: 5 },
      { id: '5', username: 'William Moore', elo_rating: 1050, win_streak: 1 },
      { id: '6', username: 'Somil Boora', elo_rating: 1250, win_streak: 0 },
      { id: '7', username: 'B Cran', elo_rating: 1400, win_streak: 10 },
      { id: '8', username: 'Subra Narayan', elo_rating: 980, win_streak: 2 },
      { id: '9', username: 'Ryan Campbell', elo_rating: 1350, win_streak: 0 },
      { id: '10', username: 'MM', elo_rating: 1280, win_streak: 4 },
      { id: '11', username: 'Glizzy Goblin (Nathan)', elo_rating: 901, win_streak: 0 },
      { id: '12', username: 'D Low', elo_rating: 875, win_streak: 0 },
    ].sort((a, b) => b.elo_rating - a.elo_rating) as any
    matchesData = [
      { winner_id1: '7', loser_id1: '1', winner_id2: null, loser_id2: null }, 
      { winner_id1: '4', loser_id1: '2', winner_id2: null, loser_id2: null },
      { winner_id1: '4', loser_id1: '3', winner_id2: null, loser_id2: null },
      { winner_id1: '6', loser_id1: '5', winner_id2: null, loser_id2: null },
      { winner_id1: '1', loser_id1: '5', winner_id2: null, loser_id2: null },
      { winner_id1: '9', loser_id1: '10', winner_id2: null, loser_id2: null },
      { winner_id1: '8', loser_id1: '4', winner_id2: null, loser_id2: null },
      { winner_id1: '10', loser_id1: '2', winner_id2: null, loser_id2: null },
      { winner_id1: '7', loser_id1: '9', winner_id2: null, loser_id2: null },
      { winner_id1: '1', loser_id1: '8', winner_id2: null, loser_id2: null },
      { winner_id1: '5', loser_id1: '3', winner_id2: null, loser_id2: null },
      { winner_id1: '7', loser_id1: '6', winner_id2: null, loser_id2: null },
      { winner_id1: '11', loser_id1: '12', winner_id2: null, loser_id2: null },
    ] as any
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
            <TableCell>{{ player.games_played }}</TableCell>
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

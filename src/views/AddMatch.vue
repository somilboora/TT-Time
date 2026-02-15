<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../utils/supabase'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Tables } from '../../database.types'

const profiles = ref<Tables<'profiles'>[]>([])
const isDoubles = ref(false)
const loading = ref(false)

// Player IDs (UUIDs from profiles table)
const winner_id1 = ref('')
const winner_id2 = ref('')
const loser_id1 = ref('')
const loser_id2 = ref('')
const winnerScore = ref(0)
const loserScore = ref(0)

onMounted(async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('username', { ascending: true })

  if (data) profiles.value = data
})

async function submitMatch() {
  loading.value = true
  // 1. Score check
  if (winnerScore.value < 0 || loserScore.value < 0) {
    alert('Scores must be 0 or higher.')
    return
  }

  if (winnerScore.value < loserScore.value) {
    alert('Winner score must be greater than or equal to loser score.')
    return
  }

  // 2. Build a list of all participating IDs
  const activePlayers = [winner_id1.value, loser_id1.value]
  if (isDoubles.value) {
    activePlayers.push(winner_id2.value, loser_id2.value)
  }

  // 3. Check for empty selections
  if (activePlayers.some((id) => !id)) {
    alert('Please select all required players.')
    return
  }

  // 4. Check for duplicates (A player cannot play against themselves or be their own teammate)
  const uniqueCount = new Set(activePlayers).size
  if (uniqueCount !== activePlayers.length) {
    alert('Each player in the match must be unique!')
    return
  }
  loading.value = false

  // const payload = {
  //   winner_id1: winner_id1.value,
  //   loser_id1: loser_id1.value,
  //   winner_id2: isDoubles.value ? winner_id2.value : null,
  //   loser_id2: isDoubles.value ? loser_id2.value : null,
  //   winner_score: winnerScore.value,
  //   loser_score: loserScore.value,
  //   is_doubles: isDoubles.value,
  // }

  // console.log('Submitting match with payload:', payload)

  const { error } = await supabase.from('matches').insert({
    winner_id1: winner_id1.value,
    loser_id1: loser_id1.value,
    winner_id2: isDoubles.value ? winner_id2.value : null,
    loser_id2: isDoubles.value ? loser_id2.value : null,
    winner_score: winnerScore.value,
    loser_score: loserScore.value,
    is_doubles: isDoubles.value,
  } as any)

  if (error) {
    alert('Error: ' + error.message)
  } else {
    alert('Match recorded!')
    // Reset form logic here
  }
  loading.value = false
}
</script>
<template>
  <div class="flex w-full items-center justify-center py-10">
    <Card>
      <CardHeader>
        <CardTitle>Record a Match</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center space-x-2 pb-4">
          <input type="checkbox" id="doubles" v-model="isDoubles" class="w-4 h-4" />
          <label for="doubles" class="text-sm font-medium">Doubles Match</label>
        </div>

        <div class="grid grid-cols-2 gap-10">
          <div class="flex flex-col space-y-4">
            <label class="text-sm font-medium text-green-600">Winner(s)</label>
            <select
              v-model="winner_id1"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Player</option>
              <option v-for="p in profiles" :key="p.id" :value="p.id">{{ p.username }}</option>
            </select>

            <select
              v-if="isDoubles"
              v-model="winner_id2"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Second Player</option>
              <option v-for="p in profiles" :key="p.id" :value="p.id">{{ p.username }}</option>
            </select>

            <Input v-model="winnerScore" type="number" placeholder="Winner Score" />
          </div>

          <div class="flex flex-col space-y-4">
            <label class="text-sm font-medium text-red-600">Loser(s)</label>
            <select
              v-model="loser_id1"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Player</option>
              <option v-for="p in profiles" :key="p.id" :value="p.id">{{ p.username }}</option>
            </select>

            <select
              v-if="isDoubles"
              v-model="loser_id2"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Second Player</option>
              <option v-for="p in profiles" :key="p.id" :value="p.id">{{ p.username }}</option>
            </select>

            <Input v-model="loserScore" type="number" placeholder="Loser Score" />
          </div>
        </div>

        <div class="pt-10">
          <Button class="w-full" :disabled="loading" @click="submitMatch">
            {{ loading ? 'Saving...' : 'Submit Match' }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

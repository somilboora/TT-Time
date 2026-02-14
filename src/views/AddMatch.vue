<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../../utils/supabase'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const router = useRouter()
const player1 = ref('')
const player2 = ref('')
const score1 = ref(0)
const score2 = ref(0)
const loading = ref(false)

async function submitMatch() {
  loading.value = true

  // We'll insert this into a 'matches' table
  const { error } = await supabase.from('matches').insert([
    {
      player_one: player1.value,
      player_two: player2.value,
      score_one: score1.value,
      score_two: score2.value,
    },
  ])

  if (error) {
    alert(error.message)
  } else {
    // Go back to leaderboard to see results
    router.push({ name: 'leaderboard' })
  }
  loading.value = false
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <Card>
      <CardHeader>
        <CardTitle>Record a Match</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Player 1</label>
            <Input v-model="player1" placeholder="Name" />
            <Input v-model="score1" type="number" placeholder="Score" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Player 2</label>
            <Input v-model="player2" placeholder="Name" />
            <Input v-model="score2" type="number" placeholder="Score" />
          </div>
        </div>
        <Button class="w-full" :disabled="loading" @click="submitMatch">
          {{ loading ? 'Saving...' : 'Submit Match' }}
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

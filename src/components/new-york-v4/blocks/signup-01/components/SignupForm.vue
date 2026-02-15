<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import supabase from '../../../../../../utils/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const email = ref('')
const password = ref('')
const username = ref('')

async function handleSignup() {
  loading.value = true
  const emailVal = email.value
  const passwordVal = password.value

  // 1. Send the request to Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: emailVal,
    password: passwordVal,
  })

  if (error) {
    // 2. Handle errors (e.g., weak password, email already exists)
    alert(error.message)
    loading.value = false
  } else {
    // 3. Success! By default, Supabase sends a confirmation email
    alert('Success! No email verification required.')
    router.push({ name: 'leaderboard' })
  }

  // 2. Create the Public Profile
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id, // Link to the Auth ID
      username: username.value,
      elo_rating: 1000, // Starting Elo
      win_streak: 0,
    } as any)

    if (profileError) alert(profileError.message)
    else alert('New User Created, enjoy the game!')
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
      <CardDescription> Enter your information below to create your account </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel for="name"> Full Name </FieldLabel>
            <Input v-model="username" type="text" placeholder="John Doe" required />
          </Field>
          <Field>
            <FieldLabel for="email"> Email </FieldLabel>
            <Input v-model="email" id="email" type="email" placeholder="m@example.com" required />
            <FieldDescription>
              We'll use this to contact you. We will not share your email with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="password"> Password </FieldLabel>
            <Input v-model="password" id="password" type="password" required />
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          </Field>
          <FieldGroup>
            <Field>
              <Button type="submit" :disabled="loading" @click.prevent="handleSignup">
                {{ loading ? 'Creating Account...' : 'Create Account' }}
              </Button>
              <FieldDescription class="px-6 text-center">
                Already have an account? <RouterLink to="/login">Sign in</RouterLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>

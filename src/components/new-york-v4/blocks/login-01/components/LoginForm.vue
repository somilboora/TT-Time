<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { supabase } from '../../../../../../utils/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const loading = ref(false)
const router = useRouter()

async function onSubmit(values: any) {
  const emailVal = email.value
  const passwordVal = password.value

  const { error } = await supabase.auth.signInWithPassword({
    email: emailVal,
    password: passwordVal,
  })

  if (error) {
    alert(error.message)
    loading.value = false
    return
  } else {
    alert('Login successful!')
    router.push('/leaderboard')
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel for="email"> Email </FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password"> Password </FieldLabel>
                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit" :disabled="loading" @click.prevent="onSubmit">{{
                loading ? 'Logging in...' : 'Login'
              }}</Button>
              <FieldDescription class="text-center">
                Don't have an account?
                <RouterLink to="/signup" class="text-blue-500 hover:underline">
                  Sign up
                </RouterLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

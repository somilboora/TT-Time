<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import supabase from '../../../../../../utils/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Route } from 'lucide-vue-next'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleSignup() {
  loading.value = true

  // 1. Send the request to Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    // 2. Handle errors (e.g., weak password, email already exists)
    alert(error.message)
    loading.value = false
  } else {
    // 3. Success! By default, Supabase sends a confirmation email
    alert('Success! Check your email for the confirmation link.')
    router.push({ name: 'login' })
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
            <Input id="name" type="text" placeholder="John Doe" required />
          </Field>
          <Field>
            <FieldLabel for="email"> Email </FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required />
            <FieldDescription>
              We'll use this to contact you. We will not share your email with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="password"> Password </FieldLabel>
            <Input id="password" type="password" required />
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel for="confirm-password"> Confirm Password </FieldLabel>
            <Input id="confirm-password" type="password" required />
            <FieldDescription>Please confirm your password.</FieldDescription>
          </Field>
          <FieldGroup>
            <Field>
              <Button type="submit"> Create Account </Button>
              <Button variant="outline" type="button"> Sign up with Google </Button>
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

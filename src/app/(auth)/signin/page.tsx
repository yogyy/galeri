"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { login } from "@/lib/authentication"
import { authentication, AuthSchema } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authentication),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit({ username, password }: AuthSchema) {
    startTransition(async () => {
      login(username, password).then((data) => {
        if (data === undefined) {
          toast.success("welcome back bang admin")
        } else {
          toast.error(data.error)
        }
      })
    })
  }

  return (
    <>
      <h1>Sign in</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-cyan font-semibold text-black"
            type="submit"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </>
  )
}

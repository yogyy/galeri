"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { register } from "@/lib/authentication"
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
import { Link } from "@/components/ui/link"

export function RegisterForm() {
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authentication),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit({ username, password }: AuthSchema) {
    register(username, password).then((data) => {
      if (data === undefined) {
        toast.success("you can login now")
      } else {
        toast.error(data.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="superman" {...field} />
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
                <Input placeholder="kryptonite" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-cyan font-semibold text-black"
          type="submit"
        >
          Register
        </Button>
      </form>
    </Form>
  )
}

function ToTheCode() {
  return (
    <Link
      href="https://github.com/yogyy/galeri/commit/e7c870487a150bf512e8da1d8ac1c1d274ff93f2"
      className="ml-auto text-sm"
      style={{
        color: "#000",
      }}
    >
      code
    </Link>
  )
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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

const authentication = z.object({
  username: z.string().min(4, {
    message: "username must be at least 4 characters",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
})

export function RegisterForm() {
  const form = useForm<z.infer<typeof authentication>>({
    resolver: zodResolver(authentication),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(v: z.infer<typeof authentication>) {
    console.log(v)
    toast.info("register not available", {
      description: "read full code see implementation",
      action: <ToTheCode />,
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

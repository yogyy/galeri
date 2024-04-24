"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { getErrorMessage } from "@/lib/handle-error"
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
import { uploadNewPhoto } from "@/app/_lib/actions"
import { uploadPhoto, UploadPhotoSchema } from "@/app/_lib/validation"

export function UploadPhotoForm() {
  const [isPending, startTransition] = useTransition()

  // 1. Define your form.
  const form = useForm<UploadPhotoSchema>({
    resolver: zodResolver(uploadPhoto),
    defaultValues: {
      authorHandle: "",
      authorName: "",
      height: "",
      width: "",
      storageKey: "",
      tweetUrl: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: UploadPhotoSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    startTransition(() => {
      toast.promise(uploadNewPhoto(values), {
        loading: "uploading photo",
        success() {
          form.reset()
          return "photo uploaded"
        },
        error(error) {
          return getErrorMessage(error)
        },
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 font-lta"
      >
        <div className="flex flex-wrap justify-between">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input placeholder="width" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input placeholder="height" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="storageKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage Key</FormLabel>
              <FormControl>
                <Input placeholder="storage key" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tweetUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tweet URL</FormLabel>
              <FormControl>
                <Input placeholder="tweet URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap justify-between">
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="author name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorHandle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>author username</FormLabel>
                <FormControl>
                  <Input placeholder="author username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

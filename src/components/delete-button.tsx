"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { getErrorMessage } from "@/lib/handle-error"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Trash } from "@/components/icons"
import { deletePhoto } from "@/app/(admin)/manage/_lib/actions"

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const deleteSchema = z.object({
    id: z.string(),
  })

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {
      id,
    },
  })

  function onSubmit({ id }: z.infer<typeof deleteSchema>) {
    startTransition(() => {
      toast.promise(deletePhoto(id), {
        loading: "deleting photo",
        success() {
          form.reset()
          return "photo deleted"
        },
        error(error) {
          return getErrorMessage(error)
        },
      })
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute right-3 top-3 transition sm:-translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <Button size="sm" className="bg-[#ff453a80]">
            <Trash /> Remove
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-sm bg-black/70">
        Confirm Delete This Photo
        <div className="flex justify-between">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="sr-only">
                    <FormControl>
                      <input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                variant="ghost"
                size="sm"
                className="text-mint"
              >
                Ye..
              </Button>
            </form>
          </Form>

          <DialogClose asChild className="font-bold text-red">
            <Button size="sm" variant="ghost">
              cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

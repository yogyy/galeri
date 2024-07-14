import { Button } from "@/components/ui/button"
import { Trash } from "@/components/icons"
import { deletePhoto } from "@/app/_lib/actions"

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog"

export function DeleteButton({ id }: { id: number }) {
  const action = deletePhoto.bind(null, id)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute right-3 top-3 transition sm:-translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <Button size="sm">
            <Trash /> Remove
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-sm bg-black/70">
        Confirm Delete This Photo
        <div className="flex justify-between">
          <form>
            <Button
              formAction={action}
              size="sm"
              type="submit"
              className="text-mint"
            >
              Remove
            </Button>
          </form>
          <DialogClose asChild className="font-bold text-red">
            <Button size="sm">cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

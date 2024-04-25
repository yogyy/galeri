import { Button } from "@/components/ui/button"
import { Trash } from "@/components/icons"
import { deletePhoto } from "@/app/_lib/actions"

export function DeleteButton({ id }: { id: number }) {
  const action = deletePhoto.bind(null, id)
  return (
    <form
      action={deletePhoto.bind(null, id)}
      className="absolute right-3 top-3 transition sm:-translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
    >
      <Button formAction={action} size="sm" type="submit">
        <Trash /> Remove
      </Button>
    </form>
  )
}

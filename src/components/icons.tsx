import { cn } from "@/lib/utils"

function createIcon(
  name: string,
  svgContent: React.ReactNode,
  withStrokeCurrent = true
) {
  const icon = ({ className, ...props }: React.ComponentProps<"svg">) => (
    <svg
      {...props}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={cn(
        className,
        "[&_path]:stroke-2 [&_path]:[stroke-linecap:round] [&_path]:[stroke-linejoin:round]",
        withStrokeCurrent && "[&_path]:stroke-current"
      )}
    >
      <title>{`${name} icon`}</title>
      {svgContent}
    </svg>
  )
  icon.displayName = name
  return icon
}

export const X = createIcon("X", <path d="M18 6 6 18M6 6l12 12" />)

export const Trash = createIcon(
  "Trash",
  <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
)

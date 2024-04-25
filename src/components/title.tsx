import { cn } from "@/lib/utils"

interface TitleProps
  extends Pick<React.ComponentPropsWithoutRef<"div">, "className"> {
  title: React.ReactNode
  titleLabel?: React.ReactNode
  subtitle?: React.ReactNode
}

export function Title({ title, titleLabel, subtitle, className }: TitleProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h1 className="flex flex-row items-baseline gap-3">
        <span className="text-3xl font-medium">{title}</span>
        {titleLabel}
      </h1>
      {subtitle && (
        <div className="text-lg text-text-secondary">{subtitle}</div>
      )}
    </div>
  )
}

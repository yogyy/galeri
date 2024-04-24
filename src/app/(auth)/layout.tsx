import { LazyImage } from "@/components/lazy-image"
import { Title } from "@/components/title"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex">
      <div className="relative hidden w-auto flex-1 items-center justify-center lg:flex">
        <LazyImage
          src="/icon/android-chrome-512x512.png"
          alt="image background"
          width={512}
          height={512}
          className="rotate-2 scale-75 rounded xl:scale-90"
        />
      </div>
      <div className="relative h-dvh w-auto flex-1 items-end bg-black/50 backdrop-blur">
        <div className="container flex h-full max-w-xl flex-col justify-center gap-6 p-6 px-10">
          <Title title="Authentication" className="first:text-cyan" />
          {children}
        </div>
      </div>
    </main>
  )
}

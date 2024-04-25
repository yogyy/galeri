import { getPhotos } from "@/lib/get-photos"
import { Card } from "@/components/ui/card"
import { Collage } from "@/components/collage"
import { Title } from "@/components/title"

export default async function Home() {
  const photos = await getPhotos()
  return (
    <main className="container pt-24">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title
              title="irasuto"
              titleLabel={
                <span className="text-base text-text-tertiary">イラスト</span>
              }
              subtitle="This is where I store my collection of some of the most gorgeous illustrations related to Japanese popular culture that I’ve found on Twitter. Enjoy :)"
            />
          </div>
        </div>
        <Collage photos={photos} />
      </Card>
    </main>
  )
}

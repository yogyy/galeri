import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Title } from "@/components/title"

import { Logout } from "./_components/logout-button"
import { Navbar } from "./_components/navbar"
import { UploadPhotoForm } from "./_components/upload-photo-form"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container pt-24">
        <Card className="flex flex-col p-0">
          <div className="bg-bg-darker py-6">
            <div className="container flex max-w-screen-md flex-col gap-6">
              <Title
                title="Admin Galeri Page"
                titleLabel={
                  <span className="text-base text-text-tertiary">イラスト</span>
                }
                subtitle="This is where I store my collection of some of the most gorgeous illustrations related to Japanese popular culture that I’ve found on Twitter. Enjoy :)"
              />
              <div className="flex flex-col items-center gap-x-6 gap-y-3 sm:flex-row">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      転載について新しい写真を公開する
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto bg-black/70 sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upload New Image</DialogTitle>
                    </DialogHeader>
                    <UploadPhotoForm />
                  </DialogContent>
                </Dialog>
                <Logout />
              </div>
            </div>
          </div>
          {children}
        </Card>
      </main>
    </>
  )
}

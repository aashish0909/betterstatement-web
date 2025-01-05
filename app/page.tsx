import FileUpload from "@/components/FileUpload"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FileUpload maxSize={5} allowedTypes={[".csv", ".pdf"]} />
    </main>
  )
}
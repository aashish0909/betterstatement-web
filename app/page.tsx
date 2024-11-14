import Meteors from "@/components/ui/meteors";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <Meteors number={30} />
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-purple-300 via-blue-500 to-pink-300 bg-clip-text text-center text-8xl font-bold leading-relaxed text-transparent">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
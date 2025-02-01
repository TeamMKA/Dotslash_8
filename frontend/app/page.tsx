import { Cases } from "@/components/Cases";

export default function Home() {
  return (
    <main className="relative flex  items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
      <div className="max-w-7xl w-full">
        <Cases />
      </div>
    </main>

  );
}

import CardHover from "@/components/CardHover";
import { Cases } from "@/components/Cases";
import TimeLineSection from "@/components/TimeLineSection";

export default function Home() {
  return (
    <main className="relative flex  items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
      <div className="max-w-7xl w-full">
        <Cases />
        <TimeLineSection />
        <CardHover />
      </div>
    </main>

  );
}

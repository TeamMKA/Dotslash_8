import AnimatedNavbar from "@/components/AnimatedNavbar";
import CardHover from "@/components/CardHover";
import { Cases } from "@/components/Cases";
import TimeLineSection from "@/components/TimeLineSection";

export default function Home() {

  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/register",
      label: "Register",
    },
    {
      href: "/report",
      label: "Report",
    },
    {
      href: "/all-case",
      label: "All Cases",
    },
  ];
  return (
    <main className="relative flex  items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
      <AnimatedNavbar items={navItems} />
      <div className="max-w-7xl w-full">
        <Cases />
        <TimeLineSection />
        <CardHover />
      </div>
    </main>

  );
}

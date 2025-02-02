import { HoverEffect } from "@/components/ui/card-hover";

export default function CardHover() {
  return (
    <div className="max-w-5xl mx-auto mb-10 min-h-screen p-5">
      <h1 className="heading text-yellow-500">Explore</h1>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Register a Case",
    description:
      "Automated facial recognition to compare and match faces against a database, aiding in quick identification and verification.",
    link: "/register",
  },
/*   {
    title: "Aadhaar Scanning",
    description:
      "Instantly scan and verify Aadhaar details to authenticate identities and streamline documentation in the search process.",
    link: "/our-app",
  }, */
  {
    "title": "Age Progression AI",
    "description": "Experience an advanced AI system that visualizes your future appearance through sophisticated aging simulation.",
    "link": "/age"
  },
  {
    title: "Safe Route Calculation",
    description:
      "Provides optimized and secure routes for search operations, ensuring safety and efficiency in navigating complex terrains.",
    link: "/our-app",
  },
  {
    title: "AI-Powered Chatbot Helper",
    description:
      "24/7 AI chatbot assistance to guide users through the search process, answer queries, and provide instant support.",
    link: "/our-app",
  },
  {
    title: "Rewards for Finding Missing Persons",
    description:
      "Encouraging participation by offering rewards for verified information that helps in reuniting missing individuals.",
    link: "/gift",
  },
];

import { HoverEffect } from "@/components/ui/card-hover";

export default function CardHover() {
  return (
    <div className="max-w-5xl mx-auto mb-10 min-h-screen p-5">
        <h1 className="heading text-yellow-500" >Explore</h1>
      <HoverEffect items={projects} />
    </div>
  )
}
export const projects = [
  {
    title: "Register a Case",
    description: "Automated facial recognition to compare and match faces against a database, aiding in quick identification and verification.",
    link: "https://stripe.com",
  },
  {
    title: "Aadhaar Scanning",
    description:
      "Instantly scan and verify Aadhaar details to authenticate identities and streamline documentation in the search process.",
    link: "https://netflix.com",
  },
  {
    title: " 2D-3D Image Conversion for Search",
    description: "Transform 2D images into 3D models for enhanced visualization, making searches more accurate and efficient.",
    link: "https://google.com",
  },
  {
    title: "Safe Route Calculation",
    description:"Provides optimized and secure routes for search operations, ensuring safety and efficiency in navigating complex terrains.",
    link: "https://meta.com",
  },
  {
    title: "AI-Powered Chatbot Helper",
    description:
      "24/7 AI chatbot assistance to guide users through the search process, answer queries, and provide instant support.",
    link: "https://amazon.com",
  },
  {
    title: "Rewards for Finding Missing Persons",
    description:
      "Encouraging participation by offering rewards for verified information that helps in reuniting missing individuals.",
    link: "https://microsoft.com",
  },
]


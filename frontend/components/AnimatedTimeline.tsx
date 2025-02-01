"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import type React from "react" // Import React
import { Users, FileText, Search, Phone, Bell } from "lucide-react"

interface TimelineItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Initial Report",
    description: "File a detailed missing person report with local authorities",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-yellow-100",
  },
  {
    id: 2,
    title: "Search Team",
    description: "Specialized search and rescue team deployment",
    icon: <Users className="w-6 h-6" />,
    color: "bg-yellow-50",
  },
  {
    id: 3,
    title: "Investigation",
    description: "Thorough investigation of all leads and evidence",
    icon: <Search className="w-6 h-6" />,
    color: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Public Appeal",
    description: "Broadcast appeals for public assistance and information",
    icon: <Phone className="w-6 h-6" />,
    color: "bg-yellow-50",
  },
  {
    id: 5,
    title: "Updates",
    description: "Regular updates on the case progress",
    icon: <Bell className="w-6 h-6" />,
    color: "bg-yellow-100",
  },
]

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`relative flex items-center gap-4 p-6 rounded-lg shadow-lg mb-8 ${item.color} cursor-pointer hover:shadow-3xl `}
    > 
      <div className="p-3 bg-black rounded-full text-white hover:scale-110">{item.icon}</div>
      <div>
        <h3 className="text-xl font-bold text-black">{item.title}</h3>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </motion.div>
  )
}

export default function AnimatedTimeline() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false })

  return (
    <div className="min-h-screen mt-[2rem] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">Missing Person Case Timeline</h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Timeline line */}
          <div className="absolute left-[25px] top-0 bottom-0 w-1 bg-gray-200" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-[25px] top-0 w-1 bg-black origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ bottom: 0 }}
          />

          {/* Timeline content */}
          <div className="relative ml-16">
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Circle marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="absolute -left-[54px] mt-6 w-8 h-8 bg-black rounded-full flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 * index + 0.2 }}
                    className="w-4 h-4 bg-yellow-400 rounded-full"
                  />
                </motion.div>

                {/* Card */}
                <TimelineCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


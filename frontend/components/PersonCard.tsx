import Image from "next/image"
import type { Person } from "../hooks/usePersons"

export  function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image src={person.image || "/placeholder.svg"} alt={person.fullName} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{person.fullName}</h2>
        <p className="text-gray-600 mb-2">Age: {person.age}</p>
        <p className="text-gray-600 mb-2">Last Seen: {person.lastSeenDate}</p>
        <p className="text-gray-600 mb-2">Location: {person.lastLocation}</p>
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Emergency Contact:</h3>
          <p>{person.emergencyContact.name}</p>
          <p>{person.emergencyContact.phone}</p>
        </div>
      </div>
    </div>
  )
}


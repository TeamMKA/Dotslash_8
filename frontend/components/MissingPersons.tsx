"use client"

import { useState } from "react"
import { usePersons, type Person } from "../hooks/usePersons"
import { PersonCard } from "../components/PersonCard"
import { FilterBar, type FilterCriteria } from "../components/FilterBar"

export default function MissingPersons() {
  const { persons, loading, error } = usePersons()
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])

  const handleFilterChange = (filters: FilterCriteria) => {
    const filtered = persons.filter((person) => {
      const genderMatch = !filters.gender || person.gender === filters.gender
      const locationMatch =
        !filters.lastLocation || person.lastLocation.toLowerCase().includes(filters.lastLocation.toLowerCase())
      let ageMatch = true
      if (filters.ageRange) {
        const [min, max] = filters.ageRange.split("-").map(Number)
        const age = Number.parseInt(person.age)
        ageMatch = max ? age >= min && age <= max : age >= min
      }
      return genderMatch && locationMatch && ageMatch
    })
    setFilteredPersons(filtered)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const displayPersons = filteredPersons.length > 0 ? filteredPersons : persons

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Missing Persons Database</h1>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPersons.map((person, index) => (
          <PersonCard key={person.adhaar || index} person={person} />
        ))}
      </div>
    </div>
  )
}


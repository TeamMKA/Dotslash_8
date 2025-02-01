import { useState, type ChangeEvent } from "react"

interface FilterBarProps {
  onFilterChange: (filters: FilterCriteria) => void
}

export interface FilterCriteria {
  gender: string
  ageRange: string
  lastLocation: string
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    gender: "",
    ageRange: "",
    lastLocation: "",
  })

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select name="gender" onChange={handleFilterChange} className="p-2 border rounded">
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select name="ageRange" onChange={handleFilterChange} className="p-2 border rounded">
        <option value="">All Ages</option>
        <option value="0-5">0-5 years</option>
        <option value="6-12">6-12 years</option>
        <option value="13-17">13-17 years</option>
        <option value="18+">18+ years</option>
      </select>
      <input
        type="text"
        name="lastLocation"
        placeholder="Filter by location"
        onChange={handleFilterChange}
        className="p-2 border rounded"
      />
    </div>
  )
}


"use client";

import { useState } from "react";
import { usePersons, type Person } from "../hooks/usePersons";
import { PersonCard } from "../components/PersonCard";
import { FilterBar, type FilterCriteria } from "../components/FilterBar";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import  Link  from "next/link";
import AnimatedNavbar from "./AnimatedNavbar";

export default function MissingPersons() {
  const { persons, loading, error } = usePersons();
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

  const handleFilterChange = (filters: FilterCriteria) => {
    const filtered = persons.filter((person) => {
      const genderMatch = !filters.gender || person.gender === filters.gender;
      const locationMatch =
        !filters.lastLocation ||
        person.lastLocation
          .toLowerCase()
          .includes(filters.lastLocation.toLowerCase());
      let ageMatch = true;
      if (filters.ageRange) {
        const [min, max] = filters.ageRange.split("-").map(Number);
        const age = Number.parseInt(person.age);
        ageMatch = max ? age >= min && age <= max : age >= min;
      }
      return genderMatch && locationMatch && ageMatch;
    });
    setFilteredPersons(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayPersons = filteredPersons.length > 0 ? filteredPersons : persons;

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
  ];

  return (
    <>
    <AnimatedNavbar items={navItems} />
    <div className="container mx-auto px-4 py-8 mt-[10rem]">
      <h1 className="text-5xl font-bold text-center text-yellow-500 mb-6">
        Missing Persons Database
      </h1>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPersons.map((person, index) => (
          <PersonCard key={person.adhaar || index} person={person} />
        ))}
      </div>

      {displayPersons.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          No persons found. Try changing the filters.
        </div>
      )}

      <div className="flex flex-col items-center gap-10 mt-10 p-4">
        <h2 className="text-yellow-500 heading">
           Try Matching With Picture
        </h2>
        <p className="text-base">
          Upload a picture of the missing person to find a match
        </p>
        <Link href="/upload">
          <Button className="p-7 text-lg cursor-pointer">
            {" "}
            Check Out <ArrowRightIcon />{" "}
          </Button>
        </Link>
      </div>
    </div>
    </>
  );
}

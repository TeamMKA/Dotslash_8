/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"

export interface Person {
  adhaar: string
  age: string
  aliases: string
  circumstances: string
  clothingDescription: string
  complexion: string
  distinguishingFeatures: string
  dob: string
  emergencyContact: {
    email: string
    name: string
    phone: string
    relationship: string
  }
  fullName: string
  gender: string
  hairColor: string
  height: string
  image: string
  languages: string
  lastLocation: string
  lastSeenDate: string
  lastSeenTime: string
  medicalConditions: string[]
  medications: string
  socialMedia: string
  weight: string
}

export function usePersons() {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPersons() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"))
        console.log(querySnapshot);
        const personsData = querySnapshot.docs.map((doc) => doc.data() as Person)
        console.log(personsData);
        setPersons(personsData)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch persons data")
        setLoading(false)
      }
    }

    fetchPersons()
  }, [])

  return { persons, loading, error }
}


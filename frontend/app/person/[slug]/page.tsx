/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, doc, getDoc, getDocs , query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Person } from "@/hooks/usePersons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AnimatedNavbar from "@/components/AnimatedNavbar";

export default function PersonProfile() {
  const { slug } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("slug", slug);
    const fetchPerson = async () => {
      try {
        if (typeof slug === "string") {
          const q = query(collection(db, "users"), where("adhaar", "==", slug));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setPerson({
                ...doc.data(),
                id: doc.id,
              } as unknown as Person);
            });
          } else {
            setError("Person not found");
          }
        } else {
          setError("Invalid slug");
        }
      } catch (e) {
        setError("Error fetching person");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
  
    if (slug) {
      fetchPerson();
    }
  }, [slug]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register" },
    { href: "/report", label: "Report" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!person) return <div>Person not found</div>;

  return (
    <>
      <AnimatedNavbar items={navItems} />
      <div className="container mx-auto px-4 py-8 border bg-white  z-[5000] mt-[4rem]">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={person.image} alt={person.fullName} />
              <AvatarFallback>
                {person.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold">
              {person.fullName}
            </CardTitle>
            <Badge variant="outline">
              {person.gender}, {person.age} years old
            </Badge>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoSection title="Personal Details">
              <InfoItem label="Date of Birth" value={person.dob} />
              <InfoItem label="Height" value={person.height} />
              <InfoItem label="Weight" value={person.weight} />
              <InfoItem label="Hair Color" value={person.hairColor} />
              <InfoItem label="Complexion" value={person.complexion} />
            </InfoSection>
            <InfoSection title="Last Seen">
              <InfoItem label="Date" value={person.lastSeenDate} />
              <InfoItem label="Time" value={person.lastSeenTime} />
              <InfoItem label="Location" value={person.lastLocation} />
              <InfoItem label="Clothing" value={person.clothingDescription} />
            </InfoSection>
            <InfoSection title="Additional Information">
              <InfoItem
                label="Distinguishing Features"
                value={person.distinguishingFeatures}
              />
              <InfoItem
                label="Medical Conditions"
                value={person.medicalConditions.join(", ")}
              />
              <InfoItem label="Medications" value={person.medications} />
              <InfoItem label="Languages" value={person.languages} />
            </InfoSection>
            <InfoSection title="Emergency Contact">
              <InfoItem label="Name" value={person.emergencyContact.name} />
              <InfoItem
                label="Relationship"
                value={person.emergencyContact.relationship}
              />
              <InfoItem label="Phone" value={person.emergencyContact.phone} />
              <InfoItem label="Email" value={person.emergencyContact.email} />
            </InfoSection>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm">
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

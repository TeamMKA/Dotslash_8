'use client';
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components/Experience";

export const Cases = () => {
  return (
    <div className="text-black-100 w-full flex justify-between mt-[10rem] gap-10 p-5">
      <div className="w-[50%] flex flex-col justify-center items-center gap-5">
        <h1 className="heading font-bold  text-yellow-500">
          There are currently 10,000+ active cases reported across India.
        </h1>
        <p className="text-xl font-semibold text-center text-black-100 ">
          Our platform aggregates real-time updates from community members and
          verified sources—ranging from missing persons and accidents to various
          incidents—ensuring you always have the latest information at your
          fingertips. Stay informed, stay safe, and be a part of the collective
          effort to create a more secure environment for everyone.
        </p>

        <Button className="p-7 text-lg mt-8">
          <Link href="/all-case" className="text-white">
            View All Cases
          </Link>
          <ArrowRightIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className=" min-w-[40%] flex flex-col justify-center items-center gap-5">
        <Canvas
          shadows
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 8], fov: 42 }}
        >
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
      </div>
    </div>
  );
};

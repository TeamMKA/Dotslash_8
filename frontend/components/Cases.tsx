import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";



export const Cases = () => {

  return (
    <div className="text-black-100 w-full flex justify-between my-20 p-5">
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

        <Button className="p-7 text-lg mt-8" >
            <Link href="/all-case" className="text-white">
                View All Cases
                </Link>
                <ArrowRightIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="w-[50%] flex flex-col justify-center items-center gap-5">
        
      </div>
    </div>
  );
};

/* eslint-disable @next/next/no-img-element */
import MissingPersons from "@/components/MissingPersons";
const page = () => {
  return (
    <main className="relative flex  items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
        <MissingPersons />
    </main>
  );
};

export default page;

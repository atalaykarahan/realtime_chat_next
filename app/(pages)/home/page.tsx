"use client";
import { Vortex } from "@/components/ui/vortex";
import Buttons from "./buttons";
import Description from "./description";
import Header from "./header";

const HomePage = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={280}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <Header />
        <Description />
        <Buttons />
      </Vortex>
    </div>
  );
};

export default HomePage;

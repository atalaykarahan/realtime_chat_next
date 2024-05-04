
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  Card
} from "@/components/ui/card";
const HomePage = () => {
  return (
    <div className="bg-black py-5 px-20 flex gap-5 h-screen w-screen text-white">
      <Card className="h-full w-1/4 bg-gray-800 py-3 bg-opacity-30"></Card>
      <Card className="h-full w-3/4 bg-gray-800 py-3 bg-opacity-30"></Card>
      <BackgroundBeams/>
    </div>
  );
};

export default HomePage;

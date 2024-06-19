import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Header = () => {
  const words = [
    {
      text: "Realtime",
      className: "text-white",
    },
    {
      text: "Chat",
      className: "text-white",
    },
    {
      text: "Project",
      className: "text-white",
    },
  ];
  return (
    <>
      <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
        <TypewriterEffectSmooth words={words} />
      </h2>
    </>
  );
};

export default Header;

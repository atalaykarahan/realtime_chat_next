import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <div className="text-white bg-transparent text-sm md:text-2xl max-w-2xl text-center">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-md px-4 font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Bu proje içerisinde{" "}
          <Highlight className="text-white">
            Redis, Socket.io, PostgreSQL ve AWS S3
          </Highlight>
          {" "}teknolojileri kullanılmıştır
        </motion.h1>
      </HeroHighlight>
    </div>
  );
};

export default Description;

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const Buttons = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
      <Button variant={"outline"}>
        <FaGoogle className="mr-2 h-4 w-4" /> Giriş Yap
      </Button>
      <Button variant={"link"} className="px-4 py-2  text-white ">
        <Link href={""}>LinkedIn</Link>
      </Button>
    </div>
  );
};

export default Buttons;

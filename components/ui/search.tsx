import * as React from "react";

import { cn } from "@/lib/utils";
import { IoIosSearch } from "react-icons/io";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
      style={{ width: "-webkit-fill-available" }}
        className={cn(
          "flex h-10 items-center rounded-md border border-[#5C6B81]  bg-transparent pl-3 text-sm text-white",
          className
        )}
      >
        <IoIosSearch className="h-[16px] w-[16px] text-[#4A32B0]" />
        <input
          {...props}
          type="text"
          ref={ref}
          className="w-full p-2 bg-transparent focus:outline-none focus:border-[#5C6B81]"
        />
      </div>
    );
  }
);

Search.displayName = "Search";

export { Search };

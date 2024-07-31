"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {PiDotsThreeCircleLight} from "react-icons/pi";
import {MdOutlineDriveFileRenameOutline} from "react-icons/md";
import {AiOutlineDelete} from "react-icons/ai";

interface DropdownProps {
    isLeftMode?: boolean;
}

const Dropdown = ({isLeftMode = false}: DropdownProps) => {
    const [dropdown, setDropdown] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu open={dropdown} onOpenChange={setDropdown}>
                <DropdownMenuTrigger className="outline-none">
                    <PiDotsThreeCircleLight className="text-[#4A32B0] text-[2rem]	"/>
                </DropdownMenuTrigger>
                {/* border rengi lazim */}
                <DropdownMenuContent className="  backdrop-blur-2xl">
                    {isLeftMode && (
                        <DropdownMenuItem>
                            <AiOutlineDelete className="mr-2 h-4 w-4 text-rose-700"/>
                            <span>Benden Sil</span>
                        </DropdownMenuItem>
                    )}
                    {isLeftMode || (
                        <>
                            <DropdownMenuItem>
                                <MdOutlineDriveFileRenameOutline className="mr-2 text-yellow-600 h-4 w-4"/>
                                Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <AiOutlineDelete className="mr-2 h-4 w-4 text-rose-700"/>
                                <span>Sil</span>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Dropdown;

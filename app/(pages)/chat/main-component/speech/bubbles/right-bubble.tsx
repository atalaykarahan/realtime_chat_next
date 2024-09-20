import Image from "next/image";
import Dropdown from "../dropdown";
import { extractTime } from "@/lib/utils";
import { Message } from "@/models/Message";
import { useEffect, useRef, useState } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { updateMessageByIdBody } from "@/app/api/services/message.Service";
import { toast } from "sonner";
import { MdBlock } from "react-icons/md";

interface RightBubbleProps {
  user: any;
  group?: boolean;
  msg: Message;
  time: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newMessage: string) => void;
}

const RightBubble: React.FC<RightBubbleProps> = ({
  user,
  group,
  msg,
  time,
  onDelete,
  onUpdate,
}) => {
  const formattedTime = extractTime(time);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState<string>(msg.message);
  const messageRef = useRef<HTMLDivElement>(null);
  const [messageWidth, setMessageWidth] = useState<number>(0);

  useEffect(() => {
    if (messageRef.current) {
      setMessageWidth(messageRef.current.offsetWidth);
    }
  }, [msg.message, isEditing]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMessage(e.target.value);
  };

  const handleEditSubmit = async () => {
    const res = await updateMessageByIdBody(msg.message_id, editedMessage);

    if (res.status !== 200) {
      toast("Mesaj silinirken bir hata oluştu.");
      console.error(res);
    }

    onUpdate(msg.message_id, editedMessage);
    console.log(msg.message_id, editedMessage);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditedMessage(msg.message);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="block md:px-6 px-4 ">
      <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse mb-4">
        <div className=" flex flex-col max-w-[40%]  gap-1">
          <div className="flex items-center gap-1">
            {!msg.deletedAt && (
              <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible ">
                <span
                  className="w-7 h-7 rounded-full bg-default-100 flex items-center justify-center"
                  id="radix-:r1a:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                >
                  <Dropdown msg={msg} onDelete={onDelete} onEdit={handleEdit} />
                </span>
              </div>
            )}

            <div className="whitespace-pre-wrap break-all">
              {isEditing ? (
                <div className="flex items-center gap-2 px-">
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={handleEditChange}
                    className="bg-[#231758] text-primary-foreground text-sm py-2 px-3 max-w-[500px] min-w-[200px] rounded-2xl input-expand"
                    style={{ width: messageWidth }}
                  />

                  <>
                    <CiCircleCheck
                      onClick={handleEditSubmit}
                      className="text-green-700 hover:text-green-500 transition-all duration-500 text-[2rem]"
                    />
                    <CiCircleRemove
                      onClick={handleEditCancel}
                      className="text-red-700 hover:text-red-500 transition-all duration-500 text-[2rem]"
                    />
                  </>
                </div>
              ) : (
                <div
                  ref={messageRef}
                  className={`bg-[#231758] text-sm py-2 px-3 rounded-2xl flex-1 ${
                    msg.deletedAt
                      ? "text-gray-500 italic"
                      : "text-primary-foreground"
                  }`}
                >
                  {msg.deletedAt ? (
                    <div className="flex items-center gap-2">
                      <MdBlock className="h-4 w-4" />
                      <span>This message has been deleted.</span>
                    </div>
                  ) : (
                    msg.message
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 text-xs text-gray-500">
            {!msg.deletedAt && msg.updatedAt !== msg.createdAt && (
              <span className="italic">Edited</span>
            )}
            <span className="text-[#e0f2fe]">{formattedTime}</span>
          </div>
        </div>
        {group && (
          <div className="flex self-end -translate-y-5">
            <div className="h-8 w-8 rounded-full ">
              <Image
                width={40}
                height={40}
                src={user?.photo}
                alt="/images/avatar/avatar-2.jpg"
                className="block w-full h-full object-cover rounded-full"
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightBubble;

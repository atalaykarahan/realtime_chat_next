import FriendsSettings from "@/app/(pages)/chat/main-component/friends/page";
import ChatBox from "@/app/(pages)/chat/main-component/chat-box/chat-box";
import {useAppSelector} from "@/app/redux/store";

interface MainComponentProps {
    user: any
}

const MainComponent: React.FC<MainComponentProps> = ({user}) => {
    const chatBoxValue = useAppSelector((state) => state.messageBoxReducer.value);
    return (
        <>
            {/*friends settings */}
            <FriendsSettings chatBoxStatus={chatBoxValue.chatBoxStatus}/>

            {/* chat box */}
            <ChatBox chatBoxValue={chatBoxValue} user={user}/>
        </>
    )
}

export default MainComponent;
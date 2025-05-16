import MessageItem from "./MessageItem";
import type { IMessage } from "../../interface/Message";

interface MessageListProp {
  messages: IMessage[];
}

const MessageList = ({ messages }: MessageListProp) => (
  <div>
    {messages.map((msg) => (
      <MessageItem key={msg.id} message={msg} />
    ))}
  </div>
);

export default MessageList;

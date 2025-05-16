import MessageItem from "./MessageItem";
import type { IMessage } from "../../app/interface/Message";

interface MessageListProp {
  messages: IMessage[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onDelete: (ids: string[]) => void;
  onExport: (ids: string[]) => void;
}

const MessageList = ({
  messages,
  selectedIds,
  onToggleSelect,
  onDelete,
  onExport,
}: MessageListProp) => (
  <div>
    {messages.map((msg) => (
      <MessageItem
        key={msg.id}
        message={msg}
        isSelected={selectedIds.includes(msg.id)}
        onToggleSelect={onToggleSelect}
        onDelete={onDelete}
        onExport={onExport}
      />
    ))}
  </div>
);

export default MessageList;
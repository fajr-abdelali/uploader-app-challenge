import { Button } from "@mui/material";
import { useState } from "react";
import MessageTextInput from "./MessageTextInput";
import type { IMessage } from "../../interface/Message";
import MessageImageInput from "./MessageImageInput";

interface ITopBarComponentProp {
  onSend: (message: IMessage) => void;
}

const TopBarComponent = ({ onSend }: ITopBarComponentProp) => {
  const [message, setMessage] = useState<IMessage>({
    id: "",
    text: "",
    img: undefined,
  });

  const [inputKey, setInputKey] = useState<number>(Date.now());

  const handleTextChange = (text: string) =>
    setMessage((msg) => ({ ...msg, text }));

  const handleImageChange = (img?: string) =>
    setMessage((msg) => ({ ...msg, img }));

  const handleImageDrop = (img: string) => {
    setMessage((msg) => ({ ...msg, img }));
    setInputKey(Date.now());
  };

  const canSend = message.text.trim() !== "" || !!message.img;

  const handleSend = () => {
    if (canSend) {
      const newMessage = {
        ...message,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      };
      onSend(newMessage);
      setMessage({ id: "", text: "", img: undefined });
      setInputKey(Date.now());
    }
  };

  return (
    <div>
      <MessageTextInput value={message.text} onChange={handleTextChange} onImageDrop={handleImageDrop} />
      <MessageImageInput key={inputKey} onChange={handleImageChange} />
      <Button variant="contained" onClick={handleSend} disabled={!canSend}>
        Send
      </Button>
    </div>
  );
};

export default TopBarComponent;

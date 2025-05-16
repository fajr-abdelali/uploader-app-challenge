import { Button } from "@mui/material";
import MessageImageInput from "./MessageImageInput";
import MessageTextInput from "./MessageTextInput";
import { useState } from "react";
import type { IMessage } from "../../interface/Message";

interface ITopBarComponentProp {
  onSend: (message: IMessage) => void;
}

const TopBarComponent = ({ onSend }: ITopBarComponentProp) => {
  const [message, setMessage] = useState<IMessage>({
    id: "",
    text: "",
    images: [], // Changed to array
  });

  const [inputKey, setInputKey] = useState<number>(Date.now());

  const handleTextChange = (text: string) =>
    setMessage(msg => ({ ...msg, text }));

  const handleImagesChange = (newImages: string[]) =>
    setMessage(msg => ({ ...msg, images: [...msg.images, ...newImages] }));

  const handleImagesDrop = (newImages: string[]) =>
    setMessage(msg => ({ ...msg, images: [...msg.images, ...newImages] }));

  const canSend = message.text.trim() !== "" || message.images.length > 0;

  const handleSend = () => {
    if (canSend) {
      const newMessage = {
        ...message,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      };
      onSend(newMessage);
      setMessage({ id: "", text: "", images: [] });
      setInputKey(Date.now());
    }
  };

  return (
    <div>
      <MessageTextInput 
        value={message.text} 
        onChange={handleTextChange}
        onImagesDrop={handleImagesDrop}
      />
      <MessageImageInput key={inputKey} onChange={handleImagesChange} />
      <Button
        variant="contained"
        onClick={handleSend}
        disabled={!canSend}
      >
        Send
      </Button>
    </div>
  );
};

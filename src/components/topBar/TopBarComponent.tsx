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
    text: "",
    img: undefined,
  });

  const handleTextChange = (text: string) =>
    setMessage((msg) => ({ ...msg, text }));

  const handleImageChange = (img?: string) =>
    setMessage((msg) => ({ ...msg, img }));

  const handleSend = () => {
    if (message.text.trim() || message.img) {
      onSend(message);
      setMessage({ text: "", img: undefined });
    }
  };

  return (
    <div>
      <MessageTextInput value={message.text} onChange={handleTextChange} />
      <MessageImageInput onChange={handleImageChange} />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default TopBarComponent;

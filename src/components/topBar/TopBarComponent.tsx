import { useState } from "react";
import MessageImageInput from "./MessageImageInput";
import MessageTextInput from "./MessageTextInput";
import { Button } from "@mui/material";
import type { IMessage } from "../../interface/Message";

interface ITopBarComponentProp {
  onSend: (message: IMessage) => void;
}

function TopBarComponent({ onSend }: ITopBarComponentProp) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleAddImages = (newImages: string[]) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const canSend = text.trim() !== "" || images.length > 0;

  const handleSend = () => {
    if (!canSend) return;
    onSend({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text,
      images,
    });
    setText("");
    setImages([]);
  };

  return (
    <div>
      <MessageTextInput
        value={text}
        onChange={setText}
        onImagesDrop={handleAddImages}
      />
      <MessageImageInput
        images={images}
        onAddImages={handleAddImages}
        onRemoveImage={handleRemoveImage}
      />
      <Button
        variant="contained"
        onClick={handleSend}
        disabled={!canSend}
        sx={{ mt: 2 }}
      >
        Send
      </Button>
    </div>
  );
}

export default TopBarComponent;
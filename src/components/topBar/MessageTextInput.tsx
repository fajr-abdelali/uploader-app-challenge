import { Box, Input, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface MessageTextInputProps {
  value: string;
  onChange: (value: string) => void;
  onImageDrop: (img: string) => void;
}
const MessageTextInput = ({
  value,
  onChange,
  onImageDrop,
}: MessageTextInputProps) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageDrop(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <Box
      position="relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      sx={{ width: "100%" }}
    >
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message"
        fullWidth
        multiline
      />
      {dragOver && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(255,255,0,0.7)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={10}
        >
          <Typography variant="h6" color="error">
            Drop to upload the image
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MessageTextInput;

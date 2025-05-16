import { Input, Box, Typography } from "@mui/material";
import { useState } from "react";

interface MessageTextInputProps {
  value: string;
  onChange: (value: string) => void;
  onImagesDrop: (images: string[]) => void;
}

const MessageTextInput = ({ value, onChange, onImagesDrop }: MessageTextInputProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (Array.from(e.dataTransfer.types).some((type) => type.toLowerCase() === "files")) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const maxSize = 5 * 1024 * 1024;
    const validFiles = files.filter((file) => file.size <= maxSize);

    if (validFiles.length > 0) {
      const imagePromises = validFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
          })
      );

      try {
        const images = await Promise.all(imagePromises);
        onImagesDrop(images);
      } catch (error) {
        console.error("Error processing images:", error);
      }
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      position="relative"
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message"
        fullWidth
        multiline
        sx={{
          border: isDragging ? "2px dashed red" : "none",
          minHeight: "100px",
          padding: 1,
        }}
        aria-label="Message input"
      />
      {isDragging && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(255,255,255,0.9)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="primary" variant="h6">
            Drop to upload images
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MessageTextInput;
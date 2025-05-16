import { Button, Box, IconButton } from "@mui/material";
import { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface MessageImageInputProps {
  images: string[];
  onAddImages: (images: string[]) => void;
  onRemoveImage: (index: number) => void;
}

function MessageImageInput({ images, onAddImages, onRemoveImage }: MessageImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
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
        const newImages = await Promise.all(imagePromises);
        onAddImages(newImages);
      } catch (error) {
        console.error("Error processing images:", error);
      }
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
      <Button variant="outlined" onClick={handleButtonClick}>
        Add Images
      </Button>
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
        aria-label="Upload images"
      />
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {images.map((img, idx) => (
          <Box key={idx} sx={{ position: "relative", width: 48, height: 48 }}>
            <img
              src={img}
              alt={`preview-${idx}`}
              style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }}
            />
            <IconButton
              size="small"
              onClick={() => onRemoveImage(idx)}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "white",
                boxShadow: 1,
                "&:hover": { background: "#eee" },
              }}
              aria-label={`Remove image ${idx + 1}`}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MessageImageInput;
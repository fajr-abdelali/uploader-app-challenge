import { Input } from "@mui/material";

interface MessageImageInputProps {
  onChange: (images: string[]) => void;
}

const MessageImageInput = ({ onChange }: MessageImageInputProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      const imagePromises = files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );

      const images = await Promise.all(imagePromises);
      onChange(images);
    } else {
      onChange([]);
    }
  };

  return (
    <Input
      type="file"
      inputProps={{
        accept: "image/*",
        multiple: true,
      }}
      onChange={handleFileChange}
    />
  );
};

export default MessageImageInput;

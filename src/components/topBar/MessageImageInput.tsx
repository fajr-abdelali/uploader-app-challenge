import { Input } from "@mui/material";

interface MessageImageInputProps {
  onChange: (img: string | undefined) => void;
}

const MessageImageInput = ({ onChange }: MessageImageInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      onChange(undefined);
    }
  };

  return (
    <Input
      type="file"
      inputProps={{ accept: "image/*" }}
      onChange={handleFileChange}
    />
  );
};

export default MessageImageInput;

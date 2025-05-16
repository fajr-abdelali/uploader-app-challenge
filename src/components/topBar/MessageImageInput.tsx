import { Input } from "@mui/material";

interface MessageImageInputProps {
  onChange: (img: string | undefined) => void;
}

const MessageImageInput = ({ onChange }: MessageImageInputProps) => {


  return (
    <Input
      type="file"
    />
  );
};

export default MessageImageInput;

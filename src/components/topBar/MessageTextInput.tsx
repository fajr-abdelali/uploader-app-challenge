import { Input } from "@mui/material";

interface MessageTextInputProps {
  value: string;
  onChange: (value: string) => void;
}
const MessageTextInput = ({ value, onChange }: MessageTextInputProps) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your message"
      fullWidth
    />
  );
};

export default MessageTextInput;

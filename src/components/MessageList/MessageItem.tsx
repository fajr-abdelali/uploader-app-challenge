import { Card, CardContent, Typography, Box } from "@mui/material";
import type { IMessage } from "../../interface/Message";

interface MessageItemProp {
  message: IMessage;
}

const MessageItem = ({ message }: MessageItemProp) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="body1">{message.text}</Typography>
      {message.images && (
        <Box mt={1}>
          {message.images.map((img) => (
            <img
              src={img}
              alt="attachment"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
);

export default MessageItem;

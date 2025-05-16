import { Card, CardContent, Typography, Box, Checkbox, Button } from "@mui/material";
import type { IMessage } from "../../app/interface/Message";

interface MessageItemProp {
  message: IMessage;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onDelete: (ids: string[]) => void;
  onExport: (ids: string[]) => void;
}

const MessageItem = ({
  message,
  isSelected,
  onToggleSelect,
  onDelete,
  onExport,
}: MessageItemProp) => (
  <Card sx={{ marginBottom: 2, bgcolor: isSelected ? "action.selected" : "background.paper" }}>
    <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(message.id)}
        aria-label={`Select message ${message.id}`}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">{message.text || "No text"}</Typography>
        {message.images && message.images.length > 0 && (
          <Box mt={1} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {message.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`attachment-${idx}`}
                style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover", borderRadius: 4 }}
              />
            ))}
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete([message.id])}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => onExport([message.id])}
          >
            Export
          </Button>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default MessageItem;
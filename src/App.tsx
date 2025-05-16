import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import theme from "./app/theme";
import TopBarComponent from "./components/topBar/TopBarComponent";
import type { IMessage } from "./interface/Message";
import MessageList from "./components/MessageList/MessageList";

const App: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]); // store the sent items
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSend = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleDelete = (ids: string[]) => {
    setMessages((prev) => prev.filter((msg) => !ids.includes(msg.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const handleExport = (ids: string[]) => {
    const exportData = messages
      .filter((msg) => ids.includes(msg.id))
      .map((msg) => ({
        text: msg.text || null,
        files: msg.images,
      }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBarComponent onSend={handleSend} />
      {selectedIds.length > 0 && (
        <Box sx={{ display: "flex", gap: 2, p: 2, bgcolor: "background.paper" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(selectedIds)}
          >
            Delete Selected ({selectedIds.length})
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleExport(selectedIds)}
          >
            Export Selected ({selectedIds.length})
          </Button>
        </Box>
      )}
      <MessageList
        messages={messages}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onDelete={handleDelete}
        onExport={handleExport}
      />
    </ThemeProvider>
  );
};

export default App;

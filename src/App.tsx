import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import theme from "./app/theme";
import TopBarComponent from "./components/topBar/TopBarComponent";
import type { IMessage } from "./interface/Message";
import MessageList from "./components/MessageList/MessageList";
import BulkActions from "./components/BulkActions";

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
      <BulkActions
        selectedIds={selectedIds}
        onDelete={handleDelete}
        onExport={handleExport}
      />
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

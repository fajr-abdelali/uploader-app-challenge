import React, { useState } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import MessageList from "./components/MessageList/MessageList";
import BulkActions from "./components/BulkActions";
import TopBarComponent from "./components/topBar/TopBarComponent";
import theme from "./theme";
import type { IMessage } from "./interface/Message";

const App: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]); // store the sent items
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // TODO: handleSend(text, attachments)
  const handleSend = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // TODO: handleDelete(ids: number[])
  const handleDelete = (ids: string[]) => {
    setMessages((prev) => prev.filter((msg) => !ids.includes(msg.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  // TODO: handleExport(ids: number[])
  // - collect payload [{text, attachments: [{name, previewUrl}]}]
  // - create JSON blob and trigger download
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
    <Container maxWidth="lg">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* TODO: render UploaderBar */}
        <TopBarComponent onSend={handleSend} />

        {/* TODO: Bulk actions */}
        <BulkActions
          selectedIds={selectedIds}
          onDelete={handleDelete}
          onExport={handleExport}
        />

        {/* TODO: map items to their respective components */}
        <MessageList
          messages={messages}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onDelete={handleDelete}
          onExport={handleExport}
        />
      </ThemeProvider>
    </Container>
  );
};

export default App;

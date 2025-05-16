import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./app/theme";
import TopBarComponent from "./components/topBar/TopBarComponent";
import type { IMessage } from "./interface/Message";

const App: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]); // store the sent items

  const handleSend = (message: IMessage) => {
    console.log(message);
    setMessages((prev) => {
      return prev ? [...prev, message] : prev;
    });
  };

  // TODO: handleSend(text, attachments)

  // TODO: handleDelete(ids: any[])

  // TODO: handleExport(ids: any[])
  // - collect payload [{text, attachments: [{name, previewUrl}]}]
  // - create JSON blob and trigger download

  return (
    <ThemeProvider theme={theme}>
      <TopBarComponent onSend={handleSend}></TopBarComponent>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;

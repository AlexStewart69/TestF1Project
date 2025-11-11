import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { SessionContext } from "./contexts";
import { Meetings } from "./Meetings";
import { Sessions } from "./Session";
import { Session_result } from "./Session_result";
import { BrowserRouter, Route, Routes } from "react-router";

const queryClient = new QueryClient();

const App = () => {
  const sessionHook = useState([]);
  return (
    <BrowserRouter>
      <StrictMode>
        <SessionContext.Provider value={sessionHook}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route index element={<Meetings />} />
              <Route path="sessions/:meeting_key" element={<Sessions />} />
              <Route
                path="session_result/:session_key"
                element={<Session_result />}
              />
            </Routes>
          </QueryClientProvider>
        </SessionContext.Provider>
      </StrictMode>
    </BrowserRouter>
  );
};

//https://api.openf1.org/v1/sessions?meeting_key=1217

//<Route path="sessions/:meetingid" element={<Sessions />} />

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));

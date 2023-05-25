import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="uiux-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

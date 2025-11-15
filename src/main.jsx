import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CardProvider } from "./contexts/cardContext.jsx";
import { SearchProvider } from "./contexts/searchContext.jsx";
import AppRouter from "./routes/approuter.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CardProvider>
        <SearchProvider>
          <AppRouter />
        </SearchProvider>
      </CardProvider>
    </BrowserRouter>
  </React.StrictMode>
);

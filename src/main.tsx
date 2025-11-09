import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import "./index.css";
import App from "./App.tsx";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/anime/:id", element: <DetailPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

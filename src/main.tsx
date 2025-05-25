import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Quiz from "./Quiz";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/quiz", element: <Quiz /> },
  ],
  {
    basename: "/pet-project",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

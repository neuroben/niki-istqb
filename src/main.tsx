import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Quiz from "./Quiz";

const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/quiz", element: <Quiz /> },
  ],
  {
    basename: "/pet-project", // <-- set your base path here
  }
);

function Main() {
  return <RouterProvider router={router} />;
}

export default Main;

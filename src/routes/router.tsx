import { createBrowserRouter } from "react-router-dom";

import { App } from "../app/App";
import { OceanPage } from "../pages/OceanPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <OceanPage /> },
      {
        path: "*",
        lazy: async () => ({ Component: (await import("../pages/NotFoundPage")).NotFoundPage }),
      },
    ],
  },
]);

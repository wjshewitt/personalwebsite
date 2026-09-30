import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "../app/App";
import { OceanPage } from "../pages/OceanPage";

const NotFoundPage = lazy(async () => ({
  default: (await import("../pages/NotFoundPage")).NotFoundPage,
}));

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<OceanPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

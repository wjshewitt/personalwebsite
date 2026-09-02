import { useEffect } from "react";

import { applyPageMetadata } from "../app/seo";
import OceanCanvas from "./OceanCanvas";

export function OceanPage({ testMode = false }: { testMode?: boolean }) {
  useEffect(() => {
    applyPageMetadata();
  }, []);

  return (
    <main className="ocean-page">
      <OceanCanvas testMode={testMode} />
    </main>
  );
}

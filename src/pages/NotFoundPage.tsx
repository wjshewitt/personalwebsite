import { useEffect } from "react";
import { Link } from "react-router-dom";

import { applyPageMetadata } from "../app/seo";

export function NotFoundPage() {
  useEffect(() => {
    applyPageMetadata({
      title: "Page not found",
      description: "This page could not be found.",
      robots: "noindex, follow",
    });
  }, []);

  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <p className="not-found-code" aria-hidden="true">404</p>
      <div className="not-found-copy">
        <div>
          <h1 id="not-found-title">Page not found.</h1>
          <p>The address may be wrong, or the page may have moved.</p>
        </div>
        <Link className="not-found-link" to="/">Return home <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="container not-found">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        Nothing built here.<span className="orange"> Yet.</span>
      </h1>
      <p>
        This page doesn’t exist. There’s plenty to explore back at the
        workbench.
      </p>
      <Link href="/" className="button button-dark">
        <ArrowLeft size={17} /> Back to the portfolio
      </Link>
    </main>
  );
}

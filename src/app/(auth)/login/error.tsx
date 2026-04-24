"use client";

import { useEffect } from "react";

export default function errorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]);
  return (
    <div>
      <h2> maaf terjadi error</h2>
      <button onClick={reset}>coba lagi</button>
    </div>
  );
}

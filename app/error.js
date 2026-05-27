"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/ErrorScreen";

/**
 * Global error boundary — catches errors thrown inside any route
 * segment that doesn't define its own boundary. Renders a themed
 * crash screen with a "try again" reset button.
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // surface the error in dev consoles only — never sent off-device
    if (typeof console !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      status="something tripped"
      message="the page hit an unexpected obstacle and crashed."
      detail={
        error?.message
          ? `// ${error.message}`
          : "// no further details were captured."
      }
      digest={error?.digest}
      primary={{ label: "try again", onClick: reset }}
      secondary={{ label: "back to home", href: "/" }}
    />
  );
}

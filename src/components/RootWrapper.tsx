"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState, useEffect } from "react";

interface RootWrapperProps {
  children: ReactNode;
}

export default function RootWrapper({ children }: RootWrapperProps) {
  const [queryClient] = useState(() => new QueryClient());

  // Load WhatsApp widget script
  // useEffect(() => {
  //   const scriptId = "aisensy-wa-widget";

  //   // Check if script is already loaded
  //   if (!document.getElementById(scriptId)) {
  //     const script = document.createElement("script");
  //     script.id = scriptId;
  //     script.type = "text/javascript";
  //     script.src =
  //       "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js";
  //     script.setAttribute("widget-id", "aaa45p");
  //     script.async = true;

  //     // Append to body
  //     document.body.appendChild(script);

  //     // Optional: Add error handling
  //     script.onerror = () => {
  //       console.error("Failed to load WhatsApp widget script");
  //     };

  //     script.onload = () => {
  //       console.log("WhatsApp widget script loaded successfully");
  //     };
  //   }

  //   // Cleanup function (optional)
  //   return () => {
  //     const existingScript = document.getElementById(scriptId);
  //     if (existingScript) {
  //       // Only remove if needed (usually not required for persistent widgets)
  //       // existingScript.remove();
  //     }
  //   };
  // }, []);

  return (
    <div className="">
      {/* Add third-party providers here like:
          - React Query
          - Auth providers
          - Theme providers
          - Analytics
      */}
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

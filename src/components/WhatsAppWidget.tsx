"use client";

import { useEffect } from "react";

export default function WhatsAppWidget() {
  useEffect(() => {
    const scriptId = "aisensy-wa-widget";

    // Remove existing script if any
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.src = "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js";
    script.setAttribute("widget-id", "aaa54e");
    script.async = true;

    // Append to body
    document.body.appendChild(script);

    script.onload = () => {
      console.log("WhatsApp widget loaded successfully");
    };

    script.onerror = () => {
      console.error("Failed to load WhatsApp widget");
    };

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}

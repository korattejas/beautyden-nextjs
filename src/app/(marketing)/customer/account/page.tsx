"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerAccountPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /account
    router.replace("/account");
  }, [router]);

  return null;
}

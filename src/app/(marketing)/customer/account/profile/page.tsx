"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerAccountProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /account/profile
    router.replace("/account/profile");
  }, [router]);

  return null;
}



"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerAccountOrdersPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /account/orders
    router.replace("/account/orders");
  }, [router]);

  return null;
}



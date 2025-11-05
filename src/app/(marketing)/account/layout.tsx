"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("bd_isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.push("/");
      return;
    }
  }, [router]);

  const logout = async () => {
    try {
      localStorage.removeItem("bd_isLoggedIn");
      localStorage.removeItem("bd_mobile_number");
      localStorage.removeItem("bd_auth_token");
      window.dispatchEvent(new CustomEvent("bd-auth-changed"));
    } catch {}
    router.push("/");
  };

  const menuItems = [
    { key: "orders", label: "My Orders", href: "/account/orders" },
    { key: "profile", label: "Profile", href: "/account/profile" },
  ];

  const isActive = (href: string) => {
    return pathname?.startsWith(href);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">My Account</h2>
          <nav className="space-y-2 text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`block px-3 py-2 rounded-lg ${
                  isActive(item.href)
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </aside>

        <section className="md:col-span-3">
          {children}
        </section>
      </div>
    </main>
  );
}


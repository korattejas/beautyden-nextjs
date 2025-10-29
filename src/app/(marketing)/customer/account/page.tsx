"use client";

import { useEffect, useMemo, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";

type Tab = "overview" | "profile" | "password" | "orders";

export default function CustomerAccountPage() {
  const router = useRouter();
  const [active, setActive] = useState<Tab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("bd_isLoggedIn") === "true";
    if (!isLoggedIn) router.push("/");
  }, [router]);

  const menuItems: Array<{ key: Tab; label: string }> = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "orders", label: "My Orders" },
      { key: "profile", label: "Profile" },
      { key: "password", label: "Password" },
    ],
    []
  );

  const logout = () => {
    try {
      localStorage.removeItem("bd_isLoggedIn");
      // notify header immediately
      window.dispatchEvent(new CustomEvent("bd-auth-changed"));
    } catch {}
    router.push("/");
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-64">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">My Account</h2>
              <nav className="space-y-2 text-sm">
                {menuItems.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setActive(m.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
                      active === m.key ? "bg-gray-900 text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden w-full">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">My Account</h1>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg border border-gray-200"
                aria-label="Open menu"
              >
                <HiBars3 className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[70] md:hidden">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-white shadow-2xl border-r border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold">My Account</h2>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-md hover:bg-gray-100"
                      aria-label="Close menu"
                    >
                      <HiXMark className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="space-y-2 text-sm">
                    {menuItems.map((m) => (
                      <button
                        key={m.key}
                        onClick={() => {
                          setActive(m.key);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
                          active === m.key
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
            )}

            {/* Content on mobile*/}
            <Content active={active} setActive={setActive} />
          </div>

          {/* Content Area */}
          <section className="hidden md:block flex-1 min-w-0">
            <Content active={active} setActive={setActive} />
          </section>
        </div>
      </div>
    </main>
  );
}

function Content({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  if (active === "profile") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Last Name" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="example@email.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input disabled value={"+91 9876543210"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500" />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm">Save Changes</button>
        </div>
      </div>
    );
  }
  if (active === "password") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">Password</div>
      </div>
    );
  }
  if (active === "orders") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          <div className="space-y-4">
            {[{ id: "ORD1001", title: "Deep Neck Ribbon Sweater × 1", price: 900, status: "In Transit" }, { id: "ORD1002", title: "Classic Fit Blazer × 2", price: 2400, status: "Delivered" }].map((o) => (
              <div key={o.id} className="rounded-2xl border border-gray-200 p-5 flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">Order #{o.id}</div>
                  <div className="mt-3 text-sm text-gray-700">{o.title}</div>
                  <div className="mt-3 text-sm">
                    <div className="font-semibold">Total:</div>
                    <div className="text-gray-600">Status: {o.status}</div>
                  </div>
                  <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">View Details</button>
                </div>
                <div className="text-right font-semibold">₹{o.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-xl font-semibold">Welcome back, John!</h3>
        <p className="text-sm text-gray-600 mt-1">Manage your account and explore recent activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h4 className="font-semibold">Orders</h4>
          <p className="text-sm text-gray-600">You have 3 active orders</p>
          <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50" onClick={() => setActive("orders")}>View Orders</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h4 className="font-semibold">Wishlist</h4>
          <p className="text-sm text-gray-600">5 items in your wishlist</p>
          <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">View Wishlist</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h4 className="font-semibold">Saved Addresses</h4>
          <p className="text-sm text-gray-600">2 addresses saved</p>
          <button className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Manage Addresses</button>
        </div>
      </div>

      {/* Recent Orders section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h4 className="text-lg font-semibold">Recent Orders</h4>
        <div className="mt-3 divide-y divide-gray-100">
          {[1234, 1233, 1232].map((id, idx) => (
            <div key={id} className="flex items-center justify-between py-3 text-sm">
              <div className="text-gray-800">Order #{id}</div>
              <div className="text-gray-500">{["Delivered", "Shipped", "Cancelled"][idx]}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm px-4 py-3 rounded-lg bg-gray-900 text-white">See All Orders</button>
      </div>
    </div>
  );
}



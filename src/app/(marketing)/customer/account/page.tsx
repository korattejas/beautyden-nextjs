"use client";

import { useEffect, useMemo, useState } from "react";
import { HiBars3, HiXMark, HiCalendar, HiClock, HiMapPin } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getProfile, updateProfile, getTotalBookService, getBookServiceDetails, GetBookServiceDetailsResponse } from "@/services/customer.service";

type Tab = "overview" | "profile" | "password" | "orders";

export default function CustomerAccountPage() {
  const router = useRouter();
  const [active, setActive] = useState<Tab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  useEffect(() => {
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("bd_isLoggedIn") === "true";
    const storedMobile = typeof window !== "undefined" ? localStorage.getItem("bd_mobile_number") : null;
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
    if (storedMobile) {
      setMobileNumber(storedMobile);
    }
  }, [router]);

  const menuItems: Array<{ key: Tab; label: string }> = useMemo(
    () => [
      // { key: "overview", label: "Overview" },
      { key: "orders", label: "My Orders" },
      { key: "profile", label: "Profile" },
      // { key: "password", label: "Password" },
    ],
    []
  );

  const logout = async () => {
    // Client-side-only logout: clear storage and redirect
    try {
      localStorage.removeItem("bd_isLoggedIn");
      localStorage.removeItem("bd_mobile_number");
      localStorage.removeItem("bd_auth_token");
      window.dispatchEvent(new CustomEvent("bd-auth-changed"));
    } catch {}
    router.push("/");
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex gap-6">
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

            {/* Content renders below (single instance) */}
          </div>

          {/* Content Area (single instance to avoid duplicate API calls) */}
          <section className="block flex-1 min-w-0">
            <Content active={active} setActive={setActive} mobileNumber={mobileNumber} />
          </section>
        </div>
      </div>
    </main>
  );
}

function Content({ active, setActive, mobileNumber }: { active: Tab; setActive: (t: Tab) => void; mobileNumber: string }) {
  if (active === "profile") {
    return <ProfileContent key={mobileNumber} mobileNumber={mobileNumber} />;
  }
  if (active === "password") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">Password</div>
      </div>
    );
  }
  if (active === "orders") {
    return <OrdersContent mobileNumber={mobileNumber} />;
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

function ProfileContent({ mobileNumber }: { mobileNumber: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (mobileNumber && !hasFetched) {
      console.log("Fetching profile for:", mobileNumber);
      fetchProfile();
      setHasFetched(true);
    }
  }, [mobileNumber, hasFetched]);

  const fetchProfile = async () => {
    if (!mobileNumber) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProfile({ mobile_number: mobileNumber });
      if (response.status && response.data) {
        // Accept both { data: { name, email, ... } } and { data: { customer: {...} } }
        const payload: any = response.data as any;
        const customer = payload.customer ? payload.customer : payload;
        setName(customer.name || "");
        setEmail(customer.email || "");
        setAddress(customer.address || "");
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err?.response?.data?.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!mobileNumber) return;
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await updateProfile({
        mobile_number: mobileNumber,
        name: name || undefined,
        email: email || undefined,
        address: address || undefined,
      });
      if (response.status && (response.code === 200 || response.code === 201)) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err?.response?.data?.message || err?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="text-center py-8">Loading profile...</div>
        </div>
      </div>
    );
  }

  const displayMobile = mobileNumber ? `+91 ${mobileNumber}` : "";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
            {success}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              placeholder="Enter your name"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              placeholder="example@email.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              disabled
              value={displayMobile}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
              placeholder="Enter your address"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 px-6 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function OrdersContent({ mobileNumber }: { mobileNumber: string }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<GetBookServiceDetailsResponse["data"] | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (mobileNumber && !hasFetched) {
      fetchOrders();
      setHasFetched(true);
    }
  }, [mobileNumber, hasFetched]);

  const fetchOrders = async () => {
    if (!mobileNumber) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTotalBookService({ mobile_number: mobileNumber });
      if (response.status && response.data) {
        setOrders(response.data);
      } else {
        setError(response.message || "Failed to load orders");
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(err?.response?.data?.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (appointmentId: number) => {
    if (!mobileNumber) return;
    setIsDetailsLoading(true);
    try {
      const response = await getBookServiceDetails({
        mobile_number: mobileNumber,
        appointment_id: appointmentId,
      });
      if (response.status && response.data) {
        setSelectedOrder(response.data);
      }
    } catch (err: any) {
      console.error("Error fetching order details:", err);
      alert(err?.response?.data?.message || "Failed to load order details");
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="text-center py-8">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No orders found</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-lg font-semibold mb-2">{order.order_number}</div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <HiCalendar className="w-4 h-4" />
                          <span>{formatDate(order.appointment_date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiClock className="w-4 h-4" />
                          <span>{formatTime(order.appointment_time)}</span>
                        </div>
                        {order.city_name && (
                          <div className="flex items-center gap-2">
                            <HiMapPin className="w-4 h-4" />
                            <span>{order.city_name}</span>
                          </div>
                        )}
                        <div className="mt-2">
                          <span className="font-medium">Total Services:</span> {order.total_services}
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDetails(order.id)}
                        disabled={isDetailsLoading}
                        className="mt-3 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDetailsLoading ? "Loading..." : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              className="fixed inset-0 z-[80] flex items-center justify-center p-4 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute right-4 top-4 p-2 rounded-md text-gray-500 hover:bg-gray-100"
                  aria-label="Close"
                >
                  <HiXMark className="w-5 h-5" />
                </button>

                <h3 className="text-l md:text-2xl font-bold mb-4 break-words">{selectedOrder.order_number}</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Appointment Date</div>
                      <div className="flex items-center gap-2 font-medium">
                        <HiCalendar className="w-4 h-4" />
                        {formatDate(selectedOrder.appointment_date)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Appointment Time</div>
                      <div className="flex items-center gap-2 font-medium">
                        <HiClock className="w-4 h-4" />
                        {formatTime(selectedOrder.appointment_time)}
                      </div>
                    </div>
                    {selectedOrder.city_name && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">City</div>
                        <div className="flex items-center gap-2 font-medium">
                          <HiMapPin className="w-4 h-4" />
                          {selectedOrder.city_name}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Status</div>
                      <div className="font-medium">
                        {selectedOrder.status === 1 ? "Confirmed" : "Pending"}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600 mb-2">Service Address</div>
                    <div className="font-medium">{selectedOrder.service_address}</div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600 mb-2">Services</div>
                    <ul className="space-y-2">
                      {selectedOrder.services.map((service, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Price</div>
                      <div className="text-lg font-bold">
                        ₹{selectedOrder.discount_price || selectedOrder.price}
                      </div>
                    </div>
                    {selectedOrder.discount_price && (
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm text-gray-500 line-through">₹{selectedOrder.price}</div>
                        <div className="text-sm text-green-600">
                          Save ₹{parseFloat(selectedOrder.price) - parseFloat(selectedOrder.discount_price)}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedOrder.special_notes && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm text-gray-600 mb-2">Special Notes</div>
                      <div className="text-sm">{selectedOrder.special_notes}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}



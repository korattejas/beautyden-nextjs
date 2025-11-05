"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiCalendar, HiClock, HiMapPin, HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { getTotalBookService, getBookServiceDetails, GetBookServiceDetailsResponse } from "@/services/customer.service";

export default function OrdersPage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<GetBookServiceDetailsResponse["data"] | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

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



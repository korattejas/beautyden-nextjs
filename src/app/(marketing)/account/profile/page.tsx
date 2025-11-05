"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/services/customer.service";

export default function ProfilePage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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


